let root =
{
    "name": "Health and Pollution",
    "children": [
      {
        "name": "Pregnancy",
        "children": [
          {
            "name": "Pregnant Women",
            "children": [
              {
                "name": "Maternal Health",
                "children": [
                  {
                    "name": "Prenatal Care"
                  },
                  {
                    "name": "Maternal Nutrition"
                  },
                  {
                    "name": "Maternal Morbidity"
                  }
                ]
              },
              {
                "name": "Fetal Health",
                "children": [
                  {
                    "name": "Fetal Development"
                  },
                  {
                    "name": "Fetal Malformations"
                  },
                  {
                    "name": "Fetal Growth Restriction"
                  }
                ]
              }
            ]
          },
          {
            "name": "Childbirth",
            "children": [
              {
                "name": "Childbirth Process",
                "children": [
                  {
                    "name": "Labor and Delivery"
                  },
                  {
                    "name": "Cesarean Section"
                  },
                  {
                    "name": "Assisted Delivery"
                  }
                ]
              },
              {
                "name": "Postpartum Care",
                "children": [
                  {
                    "name": "Breastfeeding"
                  },
                  {
                    "name": "Postpartum Depression"
                  },
                  {
                    "name": "Postpartum Hemorrhage"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "Pollution",
        "children": [
          {
            "name": "Air Pollution",
            "children": [
              {
                "name": "Health Effects",
                "children": [
                  {
                    "name": "Respiratory Diseases"
                  },
                  {
                    "name": "Cardiovascular Diseases"
                  },
                  {
                    "name": "Cancer"
                  }
                ]
              },
              {
                "name": "Effects on Newborns",
                "children": [
                  {
                    "name": "Low Birth Weight"
                  },
                  {
                    "name": "Preterm Birth"
                  },
                  {
                    "name": "Birth Defects"
                  }
                ]
              },
              {
                "name": "Effects on Pregnant Women",
                "children": [
                  {
                    "name": "Preterm Labor"
                  },
                  {
                    "name": "Gestational Diabetes"
                  },
                  {
                    "name": "Preeclampsia"
                  }
                ]
              }
            ]
          },
          {
            "name": "Water Pollution",
            "children": [
              {
                "name": "Contaminants",
                "children": [
                  {
                    "name": "Bacteria"
                  },
                  {
                    "name": "Viruses"
                  },
                  {
                    "name": "Chemicals"
                  }
                ]
              },
              {
                "name": "Health Effects",
                "children": [
                  {
                    "name": "Gastrointestinal Diseases"
                  },
                  {
                    "name": "Skin Diseases"
                  },
                  {
                    "name": "Reproductive Diseases"
                  }
                ]
              },
              {
                "name": "Effects on Children",
                "children": [
                  {
                    "name": "Developmental Delays"
                  },
                  {
                    "name": "Learning Disabilities"
                  },
                  {
                    "name": "Behavioral Problems"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  
let createRadialTree = function (input)
     {
  let height = 1000;
  let width = 1000;
  
  let svg = d3.select('svg')
  .append('svg')
  .attr('width', width)
  .attr('height', height);
  
  let diameter = height * 0.75;
  let radius = diameter / 2;
  
  let tree = d3.tree()
  .size([2*Math.PI, radius])
  .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
  
  let data = d3.hierarchy(input)
  
  let treeData = tree(data);
  
  let nodes = treeData.descendants();
  let links = treeData.links();
  
  let graphGroup = svg.append('g')
  .attr('transform', "translate("+(width/2)+","+(height/2)+")");
  
  
graphGroup.selectAll(".link")
  .data(links)
  .join("path")
  .attr("class", "link")
  .attr("d", d3.linkRadial()
    .angle(d => d.x)
    .radius(d => d.y))
  .attr("fill", "none")
  .attr("stroke", "gray");
  
  let node = graphGroup
  .selectAll(".node")
  .data(nodes)
  .join("g")
  .attr("class", "node")
  .attr("transform", function(d){
  return `rotate(${d.x * 180 / Math.PI - 90})` + `translate(${d.y}, 0)`;
  });
  
  
  node.append("circle").attr("r", 3);
  
  node.append("text")
  .attr("font-family", "sans-serif")
  .attr("font-size", 12)
  .attr("dx", function(d) { return d.x < Math.PI ? 8 : -8; })
 .style('fill',"darkblue")
  .attr("dy", ".31em")
  .attr("text-anchor", function(d) { return d.x < Math.PI ? "start" : "end"; })
  .attr("transform", function(d) { return d.x < Math.PI ? null : "rotate(180)"; })
  .text(function(d) { return d.data.name; });
};
  
  createRadialTree(root);