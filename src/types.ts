import { EventHandler } from '@create-figma-plugin/utilities'

export interface CreateRectanglesHandler extends EventHandler {
  name: 'CREATE_GLASSMORPHISM'
  handler: (color: string, transparency: number, blur: number, outline: number) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}
