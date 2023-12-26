import React, { Component } from 'react';
import TreeMenu from 'react-simple-tree-menu';
import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import CommonServices from '../../Services/CommonServices';
export class TreeSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeNodes: [

            ]
        }
    }
    componentDidMount() {
        this.getSections();
        // this.getAllClinicalQuestions();
    }
    render() {
        const treeData = [
            {
                key: 'first-level-node-1',
                label: 'Node 1 at the first level',
                nodes: [
                    {
                        key: 'second-level-node-1',
                        label: 'Node 1 at the second level',
                        nodes: [
                            {
                                key: 'third-level-node-1',
                                label: 'Last node of the branch',
                                nodes: [] // you can remove the nodes property or leave it as an empty array
                            },
                        ],
                    },
                ],
            },
            {
                key: 'first-level-node-2',
                label: 'Node 2 at the first level',
            },
        ];

        return (
            <TreeMenu data={this.state.treeNodes} />
        )

    }


    getSections() {
        CommonServices.getData(`/section`).then((result) => {
            debugger
            let data = result.map((value, index) => {
                let subSectonList = value.listSubSectionModel;
                let treeStructure = this.list_to_tree(subSectonList, null);
                return {
                    label: value.sectionName,
                    key: value.sectionName,
                    nodes: treeStructure
                }
            });
            this.setState({
                treeNodes: data
            });
        });

    }

    list_to_tree(data, root) {
        var r = [], o = {};
        data.forEach(function (a) {
            if (o[a.subSectionId] && o[a.subSectionId].children) {
                a.children = o[a.subSectionId] && o[a.subSectionId].children;
            }
            o[a.subSectionId] = a;
            if (a.parentSubSectionId === root) {
                var item = {
                    label: a.subSectionName,
                    key: a.subSectionName,
                }
                r.push(item);
            } else {
                o[a.parentSubSectionId] = o[a.parentSubSectionId] || {};
                o[a.parentSubSectionId].children = o[a.parentSubSectionId].children || [];
                var item = {
                    label: a.subSectionName,
                    key: a.subSectionName,
                }
                o[a.parentSubSectionId].children.push(item);
            }
        });
        console.log(r)
        debugger;
        return r;
    }

}