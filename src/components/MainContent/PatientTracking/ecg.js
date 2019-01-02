function PlethGraph(canvas, ctx, datacb) {
    var g = this;
    g.canvas = canvas;
    g.context = ctx;
    g.width = ctx.canvas.width;
    g.height = ctx.canvas.height;
    g.white_out = g.width * 0.01;
    g.fade_out = g.width * 0.15;
    g.fade_opacity = 0.2;
    g.current_x = 0;
    g.current_y = 0;
    g.erase_x = null;
    g.speed = 1;
    g.linewidth = 1;
    g.scaleFactor = 1;
    g.stop_graph = false;

    g.plethStarted = false;
    g.plethBuffer = [];

    /*
     * The call to fill the data buffer using
     * the data callback
     * ---------------------------------------- */
    g.fillData = function() {
        // console.log(datacb());

        g.plethBuffer = datacb();
    };

    /*
     * The call to start the ging
     * ---------------------------------------- */
    g.start = function() {
        // let reqAnimFrame =
        //     window.requestAnimationFrame ||
        //     window.mozRequestAnimationFrame ||
        //     window.webkitRequestAnimationFrame ||
        //     window.msRequestAnimationFrame ||
        //     window.oRequestAnimationFrame;

        // // Recursive call to do animation frames
        // if (!g.stop_graph) reqAnimFrame(g.start);

        // We need to fill in data into the buffer so we know what to draw
        g.fillData();

        // Draw the frame (with the supplied data buffer)
        g.draw();
    };

    g.draw = function() {
        // Circle back the draw point back to zero when needed (ring drawing)
        g.current_x = g.current_x > g.width ? 0 : g.current_x;

        // "White out" a region before the draw point
        for (let i = 0; i < g.white_out; i++) {
            g.erase_x = (g.current_x + i) % g.width;
            g.context.clearRect(g.erase_x, 0, 1, g.height);
        }

        // // "Fade out" a region before the white out region
        // for( i = g.white_out ; i < g.fade_out ; i++ ){
        //     g.erase_x = (g.current_x + i) % g.width;
        //     g.context.fillStyle="rgba(255, 255, 255, " + g.fade_opacity.toString() + ")";
        //     g.context.fillRect(g.erase_x, 0, 1, g.height);
        // }

        // If this is first time, draw the first y point depending on the buffer
        if (!g.started) {
            g.current_y = convertToGraphCoord(g, g.plethBuffer[0]);
            g.started = true;
        }

        // Start the drawing
        g.context.beginPath();

        // We first move to the current x and y position (last point)
        g.context.moveTo(g.current_x, g.current_y);

        for (let i = 0; i < g.plethBuffer.length; i++) {
            // Put the new y point in from the buffer
            g.current_y = convertToGraphCoord(g, g.plethBuffer[i]);

            // Draw the line to the new x and y point
            g.context.lineTo((g.current_x += g.speed), g.current_y);

            // Set the
            g.context.lineWidth = g.linewidth;
            g.context.lineJoin = "round";

            // Create stroke
            g.context.strokeStyle = "#000";
            g.context.stroke();
        }

        // Stop the drawing
        g.context.closePath();
    };
}

function convertToGraphCoord(g, num) {
    let a = (g.height / 2) * -(num * 0.2) + g.height / 2;

    return a;
}

export default PlethGraph;
