import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Table from "../../TableComponent";

import AddSection from "./AddSection";

import DetailSection from "./DetailSection";

import EditSection from "./EditSection";

import Breadcumbs from "../../Breadcumbs";

import "./styles.css";

class PatientDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addSectionVisible: false,
            mainContentVisble: true,
            detailSectionVisible: false,
            columns: [
                {
                    field: "name",
                    label: "Tên"
                },
                {
                    field: "age",
                    label: "Tuổi"
                },
                {
                    field: "state",
                    label: "Trạng thái"
                },
                {
                    field: "room",
                    label: "Phòng"
                }
            ]
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Hồ sơ bệnh nhân",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            });
        }
        if (nextProps.editDocumentSuccess) {
            this.setState({
                editSectionVisible: false,
                mainContentVisble: true
            });
        }

        if (nextProps.addDocumentSuccess) {
            this.setState({
                addSectionVisible: false,
                mainContentVisble: true
            });
        }
    }

    _checkAllCheckbox(checked) {
        let temp = this.state.data;

        temp.map(ele => {
            return (ele.isChecked = checked);
        });

        this.setState({
            allCheckboxesAreChecked: checked,
            data: temp,
            deleteBtn: true
        });

        return;
    }
    _onCheckboxChange(index, checked) {
        if (this.state.allCheckboxesAreChecked) {
            this.setState({
                allCheckboxesAreChecked: false
            });
        }

        let temp = this.state.data;

        temp[index].isChecked = checked;

        this.setState({
            data: temp
        });
    }
    async _getDetail(index) {
        await this.setState({
            detailSectionVisible: true,
            mainContentVisble: false,
            currentDocument: this.state.data[index]
        });

        this.props.getHeartDiseaseRate(this.state.currentDocument._id);
    }

    async _edit(index) {
        await this.setState({
            editSectionVisible: true,
            mainContentVisble: false,
            currentDocument: this.state.data[index]
        });
    }

    _renderDeteleButton() {
        let count = 0;
        (this.state.data || []).map(item => {
            if (item.isChecked === true) {
                count++;
            }
            return count;
        });

        if (count) {
            return (
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none"
                    }}
                    onClick={() => {
                        let documentIds = (this.state.data || []).map(i => {
                            // if (i.isChecked) {
                            return i.isChecked ? i._id : null;
                            // }
                        });
                        this.props.deleteDocuments(documentIds);
                    }}
                >
                    <FontAwesomeIcon
                        style={{
                            color: "red"
                        }}
                        icon={faTrashAlt}
                    />
                </button>
            );
        }
    }
    render() {
        let { user } = this.props;

        let { role } = user;

        return (
            <div className="main-content">
                <div
                    style={{
                        height: "100%",
                        padding: 20
                    }}
                >
                    <div
                        style={{
                            height: "100%"

                            // borderWidth: 0.5
                        }}
                    >
                        <Breadcumbs
                            history={this.props.history}
                            data={this.breadcumbs}
                        />

                        <div className="inner-main-content">
                            <div
                                className="content-area"
                                style={{
                                    display: this.state.mainContentVisble
                                        ? "block"
                                        : "none"
                                }}
                            >
                                <div className="content-header">
                                    <span
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Hồ sơ bệnh nhân
                                    </span>

                                    {(role && role.value === "admin") ||
                                    (role && role.value === "manager") ? (
                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none"
                                                }}
                                                onClick={() => {
                                                    this.setState({
                                                        addSectionVisible: true,
                                                        mainContentVisble: false
                                                    });
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "green"
                                                    }}
                                                    icon={faPlus}
                                                />
                                            </button>
                                        </div>
                                    ) : null}
                                </div>

                                <Table
                                    data={this.state.data}
                                    fields={this.state.columns}
                                    actions={{
                                        detail: true,
                                        delete:
                                            (role && role.value === "admin") ||
                                            (role && role.value === "manager")
                                                ? true
                                                : false,
                                        edit:
                                            (role && role.value === "admin") ||
                                            (role && role.value === "manager")
                                                ? true
                                                : false
                                    }}
                                    onChange={(index, checked) =>
                                        this._onCheckboxChange(index, checked)
                                    }
                                    checkAll={checked =>
                                        this._checkAllCheckbox(checked)
                                    }
                                    allCheckboxesAreChecked={
                                        this.state.allCheckboxesAreChecked
                                    }
                                    edit={index => this._edit(index)}
                                    detail={index => this._getDetail(index)}
                                    delete={id =>
                                        this.props.deleteDocuments([id])
                                    }
                                />
                            </div>

                            <AddSection
                                visible={this.state.addSectionVisible}
                                close={() => {
                                    this.setState({
                                        addSectionVisible: false,
                                        mainContentVisble: true
                                    });
                                }}
                                submit={values =>
                                    this.props.addDocument(values)
                                }
                                patientStates={this.props.patientStates}
                                doctors={this.props.doctors}
                                nurses={this.props.nurses}
                                majors={this.props.majors}
                            />
                            <EditSection
                                visible={this.state.editSectionVisible}
                                data={this.state.currentDocument}
                                close={() => {
                                    this.setState({
                                        editSectionVisible: false,
                                        mainContentVisble: true
                                    });
                                }}
                                submit={values =>
                                    this.props.editDocument(values)
                                }
                                patientStates={this.props.patientStates}
                                doctors={this.props.doctors}
                                nurses={this.props.nurses}
                                majors={this.props.majors}
                            />
                            <DetailSection
                                visible={this.state.detailSectionVisible}
                                data={this.state.currentDocument}
                                close={() => {
                                    this.setState({
                                        detailSectionVisible: false,
                                        mainContentVisble: true
                                    });
                                }}
                                submit={values =>
                                    this.props.addDocument(values)
                                }
                                heartDiseaseRate={this.props.heartDiseaseRate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PatientDocuments;
