declare -a arr=();

for i in {1..8529}
do

    if [ "$i" -lt 10 ]
    then
        arr+=("A0000$i");
    fi

    if [ "$i" -gt 9 ] && [ "$i" -lt 100 ]
    then
        arr+=("A000$i");
    fi

    if [ "$i" -gt 99 ] && [ "$i" -lt 1000 ]
    then
        arr+=("A00$i");
    fi

    if [ "$i" -gt 999 ] && [ "$i" -lt 8529 ]
    then
        arr+=("A0$i");
    fi

done
set -B
for i in {1..8500}
do
    prefix="$(($i / 1000))";
    fileName="";

    if [ "$i" -lt 10 ]
    then
        fileName+="A0000$i";
    fi

    if [ "$i" -gt 9 ] && [ "$i" -lt 100 ]
    then
        fileName+="A000$i";
    fi

    if [ "$i" -gt 99 ] && [ "$i" -lt 1000 ]
    then
        fileName+="A00$i";
    fi

    if [ "$i" -gt 999 ] && [ "$i" -lt 8529 ]
    then
       fileName+="A0$i";
    fi

    echo "====================================="
    echo $fileName
    
    curl 'https://www.physionet.org/cgi-bin/atm/ATM?database=ptbdb&tool=plot_waveforms' -H 'Origin: https://www.physionet.org' -H 'Upgrade-Insecure-Requests: 1' -H 'Content-Type: multipart/form-data; boundary=----WebKitFormBoundarySBUTh070GbovAXMd' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36' -H 'Referer: https://www.physionet.org/cgi-bin/atm/ATM?database=ptbdb&tool=plot_waveforms' --data-binary $'------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="database"\r\n\r\nchallenge/2017/training\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="rbase"\r\n\r\nA0'"$prefix"/"$fileName"$'\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="record"\r\n\r\nA00/A00004\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="signal"\r\n\r\nall\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="tdur"\r\n\r\n10\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="tfmt"\r\n\r\nsamples\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="dfmt"\r\n\r\nstandard\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="tool"\r\n\r\nsamples_to_csv\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="nbwidth"\r\n\r\n896\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="tstart"\r\n\r\n0\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="tfinal"\r\n\r\n38.400\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="sfreq"\r\n\r\n1000\r\n\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name="action"\r\n\r\n*\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name=".cgifields"\r\n\r\ntdur\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name=".cgifields"\r\n\r\ndfmt\r\n------WebKitFormBoundarySBUTh070GbovAXMd\r\nContent-Disposition: form-data; name=".cgifields"\r\n\r\ntfmt\r\n------WebKitFormBoundarySBUTh070GbovAXMd--\r\n' --compressed
    


done