import {
  Button,
  Columns,
  Container,
  MiddleAlign,
  Muted,
  RangeSlider,
  render,
  Stack,
  Text,
  TextboxNumeric,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import styles from './base.css'
import { CloseHandler, CreateRectanglesHandler } from './types'

function Plugin() {

  function hexToRgb(hex: string): string {
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = regex.exec(hex);
  
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
  
    return "255, 255, 255";
  }

  const [color, setColor] = useState('#ffffff');
  const [transparency, setTransparency] = useState<string>('0.18')
  const [blur, setBlur] = useState<string>('0')
  const [outline, setOutline] = useState<string>('0')
  
  function handleColorInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const colorValue: string = event.currentTarget.value
    console.log(hexToRgb(colorValue), "color")
    console.log(`rgba( ${hexToRgb(color)}), ${parseInt(transparency) / 100})`);
    setColor(colorValue)
  }

  function handleTransparencyInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const transparencyValue: string = event.currentTarget.value
    setTransparency(transparencyValue)
  }

  function handleBlurInput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const blurValue: string = event.currentTarget.value
    console.log(blurValue, "blur")
    setBlur(blurValue)
  }

  function handleOutlineinput(event: JSX.TargetedEvent<HTMLInputElement>) {
    const outlineValue: string = event.currentTarget.value
    console.log(outlineValue, "outline")
    setOutline(outlineValue)
  }

  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      emit<CreateRectanglesHandler>('CREATE_GLASSMORPHISM', hexToRgb(color), parseInt(transparency), parseInt(blur), parseInt(outline))
    },
    [color, parseInt(transparency), parseInt(blur), outline]
  )
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])

  const bodyContainer = {
    height: '100%',
    width: '100%',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

  const cardContainer = {
    height: '120px',
    width: '100%',
    backgroundColor: 'red'
  }

  const style = {
    height: "auto"
  }

  const card = {
    height: "180px",
    width: "300px",
    borderRadius: "10px",
    backgroundColor: `rgba( ${hexToRgb(color)}, ${parseInt(transparency) / 100})`,
    border: `1px solid rgba( ${hexToRgb(color)}, ${parseInt(outline) / 100})`,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    ['backdrop-filter']: `blur(${parseInt(blur) / 5}px)`
    }

  return (
      <div style={bodyContainer}>
        <div class={styles.header}>
          <div class={styles['circle-right']}></div>
          <div class={styles['circle-center']}></div>
          <div class={styles['circle-left']}></div>
          <div class={styles['header-wrapper']}><div style={card}></div></div><div class={styles['header-wrapper-text']}></div>
        </div>
        <div style={style}>
          <MiddleAlign>Select a shape or vector layer to apply <br></br> glassmorphism effect</MiddleAlign>
        </div>
        <div class={styles.slidecontainer}>
        <Text>
          <Muted>Color</Muted>
        </Text>
        <input type="color" value={color} onInput={handleColorInput} />
        <Text>
          <Muted>Transparency</Muted>
        </Text>
        <input class={styles.slider}
          type="range"
          max={100}
          min={0}
          onInput={handleTransparencyInput}
          value={transparency}
        />
        <Text>
          <Muted>Blur</Muted>
        </Text>
        <input class={styles.slider}
          type="range"
          max={100}
          min={0}
          onInput={handleBlurInput}
          value={blur}
        />
        <Text>
          <Muted>Outline</Muted>
        </Text>
        <input class={styles.slider}
          type="range"
          max={100}
          min={0}
          onInput={handleOutlineinput}
          value={outline}
        />
        </div>
        <Columns space="extraSmall">
          <Button fullWidth onClick={handleCreateRectanglesButtonClick} secondary>
            Create
          </Button>
          <Button fullWidth onClick={handleCloseButtonClick} secondary>
            Close
          </Button>
        </Columns>
      </div>
  )
}

export default render(Plugin)
