/* 
figma.showUI(__html__);


figma.ui.onmessage = msg => {

  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
 */

figma.showUI(__html__);

figma.ui.resize(400, 580);




figma.ui.onmessage = msg => {
  const nodess: SceneNode[] = [];
  if (msg.type === 'applyOpacity') {
    for (const node of figma.currentPage.selection) {
      if ("fills" in node) {

        var red = 255;
        var green = 255;
        var blue = 255;

        if (msg.colorValue !== "#ffffff") {
          const splitValue = msg.colorValue.split(",");
          red = parseFloat((splitValue[0]));
          green = parseFloat(splitValue[1]);
          blue = parseFloat(splitValue[2]);
        }

        
        node.fills =  [{ type: 'SOLID', color: {r: (red / 255), g: (green / 255), b: (blue / 255)}, opacity: msg.transparencyValue}];
        
      }
/*       if ("opacity" in node) {
        node.opacity = (msg.transparencyValue);
      } */

      if ("strokes" in node) {

        var red = 255;
        var green = 255;
        var blue = 255;

        if (msg.colorValue !== "#ffffff") {
          const splitValue = msg.colorValue.split(",");
          red = parseFloat((splitValue[0]));
          green = parseFloat(splitValue[1]);
          blue = parseFloat(splitValue[2]);
        }


        node.strokes = [{ type: 'SOLID', color: {r: (red / 255), g: (green / 255), b: (blue / 255)}, opacity: msg.outlineValue}];
      }


      if ("effects" in node) {

        
        

        node.effects = [{type: 'BACKGROUND_BLUR', radius: (msg.blurValue * 2), visible: true}];
      }
    }
  }
}

/* Rectangle 11 */





