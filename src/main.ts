import { on, once, showUI } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateRectanglesHandler } from './types'

export default function () {

  on<CreateRectanglesHandler>('CREATE_GLASSMORPHISM', function (color: string, transparency: number, blur: number, outline: number) {
    const nodes: Array<SceneNode> = []
    var colorValues = color.split(",");
    var blueBG, redBG, greenBG;
    var blueStroke, redStroke, greenStroke;
    for (const node of figma.currentPage.selection) {
      if ("fills" in node) { 
        redBG = parseFloat((colorValues[0]));
        greenBG = parseFloat(colorValues[1]);
        blueBG = parseFloat(colorValues[2]);
        node.fills = [{ type: 'SOLID', color: { r: (redBG / 255), g: (greenBG / 255), b: (blueBG / 255) }, opacity: transparency / 100 }];
      }
      if ("strokes" in node) {
        redStroke = parseFloat((colorValues[0]));
        greenStroke = parseFloat(colorValues[1]);
        blueStroke = parseFloat(colorValues[2]);
        node.strokes = [{ type: 'SOLID', color: { r: (redStroke / 255), g: (greenStroke / 255), b: (blueStroke / 255) }, opacity: outline / 100 }];
      }
      if ("effects" in node) {
        node.effects = [{ type: 'BACKGROUND_BLUR', radius: (blur * 2), visible: true }];
    }
    }
  })
  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({
    height: 580,
    width: 400
  })
}
