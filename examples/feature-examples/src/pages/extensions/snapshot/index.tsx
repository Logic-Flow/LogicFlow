import LogicFlow from '@logicflow/core'
import { useEffect, useRef, useState } from 'react'
import { Snapshot, DndPanel } from '@logicflow/extension'

import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Select,
  Input,
  InputNumber,
  Switch,
} from 'antd'
import CustomHtml from '@/components/nodes/custom-html/Html'
import ImageNode, { testImage } from './imageNode'
import data from './data'
import { circle as circleSvgUrl, rect as rectSvgUrl } from './svg'

import './index.less'
import '@logicflow/core/es/index.css'
import '@logicflow/extension/es/index.css'

import type { ToImageOptions } from '@logicflow/extension'

const config: Partial<LogicFlow.Options> = {
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2,
    },
    circle: {
      fill: '#f5f5f5',
      stroke: '#666',
    },
    ellipse: {
      fill: '#dae8fc',
      stroke: '#6c8ebf',
    },
    polygon: {
      fill: '#d5e8d4',
      stroke: '#82b366',
    },
    diamond: {
      fill: '#ffe6cc',
      stroke: '#d79b00',
    },
    text: {
      color: '#b85450',
      fontSize: 12,
    },
  },
  grid: {
    size: 20,
  },
  partial: true,
}

/**
 * 框选插件 Snapshot 示例
 */
export default function SnapshotExample() {
  const lfRef = useRef<LogicFlow>()
  const containerRef = useRef<HTMLDivElement>(null)

  const [fileName, setFileName] = useState<string>() // 文件名
  const [fileType, setFileType] = useState<string>('png') // 下载的图片类型
  const [width, setWidth] = useState<number>() // 宽度
  const [height, setHeight] = useState<number>() // 高度
  const [backgroundColor, setBackgroundColor] = useState<string>('white') // 背景颜色
  const [padding, setPadding] = useState<number>() //padding
  const [quality, setQuality] = useState<number>() // 图片质量
  const [partial, setPartial] = useState<boolean>(false) // 导出局部渲染

  const [blobData, setBlobData] = useState('')
  const [base64Data, setBase64Data] = useState('')

  // 初始化 LogicFlow
  useEffect(() => {
    if (!lfRef.current) {
      const lf = new LogicFlow({
        ...config,
        container: containerRef.current!,
        plugins: [Snapshot, DndPanel],
      })
      lf.register(CustomHtml)
      lf.register(ImageNode)
      lf.register(testImage)

      lf.setPatternItems([
        {
          type: 'circle',
          text: 'circle',
          label: 'circle',
          icon: circleSvgUrl,
        },
        {
          type: 'rect',
          label: 'rect',
          text: 'circle',
          icon: rectSvgUrl,
        },
        {
          type: 'test-image',
          label: 'Test Image',
          text: 'Test Image',
          icon: rectSvgUrl,
        },
      ])

      lf.on('custom:button-click', (model: any) => {
        lf.setProperties(model.id, {
          body: 'LogicFlow',
        })
      })

      // 默认开启css样式
      lf.extension.snapshot.useGlobalRules = true
      // 不会覆盖css样式，会叠加，customCssRules优先级高
      lf.extension.snapshot.customCssRules = `
          .uml-wrapper {
            line-height: 1.2;
            text-align: center;
            color: blue;
          }
        `

      lf.render(data)
      lf.translateCenter()

      lfRef.current = lf
    }
  }, [])

  // 下载
  const downLoad = async () => {
    const params: ToImageOptions = {
      fileType,
      backgroundColor,
      partial,
      width,
      height,
      padding,
      quality,
    }
    console.log(params, 'params')
    await lfRef.current?.getSnapshot(fileName, params)
    // await lfRef.current?.extension.snapshot?.getSnapshot(fileName, params)
    // 测试
    // lfRef.current?.addNode({
    //   type: 'circle',
    //   x: 100,
    //   y: 100,
    //   text: '新增circle',
    //   id: '777'
    // })
  }

  // 预览 blob
  const previewBlob = () => {
    if (lfRef.current) {
      setBlobData('')
      const params: ToImageOptions = {
        fileType,
        backgroundColor,
        partial,
        width,
        height,
        padding,
        quality,
      }
      lfRef.current
        .getSnapshotBlob(backgroundColor, fileType, params)
        .then(
          ({
            data,
            width,
            height,
          }: {
            data: Blob
            width: number
            height: number
          }) => {
            setBlobData(window.URL.createObjectURL(data))
            console.log('width, height ', width, height)
          },
        )
    }
  }

  // 预览 base64
  const previewBase64 = async () => {
    if (lfRef.current) {
      setBase64Data('')
      const params: ToImageOptions = {
        fileType,
        backgroundColor,
        partial,
        width,
        height,
        padding,
        quality,
      }
      const result = await lfRef.current.getSnapshotBase64(
        'white',
        'png',
        params,
      )
      setBase64Data(result.data)
      console.log('width, height ', result)
    }
  }

  const handleInputChange = (
    value: number | null | undefined,
    prop: string,
  ) => {
    if (value === null || value === undefined) {
      switch (
        prop // 处理 null 或 undefined 的情况
      ) {
        case 'width':
          setWidth(undefined)
          break
        case 'height':
          setHeight(undefined)
          break
        case 'padding':
          setPadding(undefined)
          break
        case 'quality':
          setQuality(undefined)
          break
      }
    } else {
      switch (
        prop // 设置有效的数字值
      ) {
        case 'width':
          setWidth(value)
          break
        case 'height':
          setHeight(value)
          break
        case 'padding':
          setPadding(value)
          break
        case 'quality':
          setQuality(value)
          break
      }
    }
  }

  return (
    <Card title="LogicFlow Extension - Snapshot">
      <Space>
        <Input
          addonBefore="文件名："
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <span>文件类型：</span>
        <Select
          defaultValue={fileType}
          style={{ width: 120 }}
          onChange={(value) => setFileType(value)}
          options={[
            { value: 'png', label: 'png' },
            { value: 'jpeg', label: 'jpeg' },
            { value: 'webp', label: 'webp' },
            { value: 'gif', label: 'gif' },
            { value: 'svg', label: 'svg' },
          ]}
        />
        <InputNumber
          addonBefore="宽度："
          value={width}
          onChange={(value) => handleInputChange(value, 'width')}
        />
        <InputNumber
          addonBefore="高度："
          value={height}
          onChange={(value) => handleInputChange(value, 'height')}
        />
      </Space>
      <p></p>
      <Space>
        <Input
          addonBefore="背景颜色"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
        <InputNumber
          addonBefore="padding："
          value={padding}
          onChange={(value) => handleInputChange(value, 'padding')}
        />
        <InputNumber
          addonBefore="图片质量："
          value={quality}
          onChange={(value) => handleInputChange(value, 'quality')}
        />
        <span>导出局部渲染：</span>
        <Switch onChange={(partial) => setPartial(partial)} />
      </Space>
      <Divider />
      <Space>
        <Button onClick={downLoad}>下载快照</Button>
        <Button onClick={previewBlob}>预览(blob)</Button>
        <Button onClick={previewBase64}>预览(base64)</Button>
      </Space>
      <Divider />
      <Flex align="center" justify="center">
        <div ref={containerRef} className="graph"></div>
      </Flex>
      <Row>
        <Col span={24}>
          {blobData && (
            <>
              <h2>blobData</h2>
              <img style={{ width: '100%' }} key="blob" src={blobData} />
            </>
          )}
          {base64Data && (
            <>
              <h2>base64Data</h2>
              <img style={{ width: '100%' }} key="base64" src={base64Data} />
            </>
          )}
        </Col>
      </Row>
    </Card>
  )
}
