export default {
  nodes: [
    {
      type: 'customHtml',
      x: 0,
      y: 50,
      id: 'uml_1',
      properties: {
        name: 'hello',
        body: '哈哈哈哈111',
      },
    },
    {
      id: 'rect_1',
      type: 'rect',
      x: 300,
      y: 0,
      text: '你好1',
    },
    {
      id: 'rect_2',
      type: 'rect',
      x: 500,
      y: 0,
      text: '你好2',
    },
    {
      id: '3',
      type: 'image',
      x: 300,
      y: 100,
      text: '云',
    },
    {
      id: '5',
      type: 'image',
      x: 500,
      y: 100,
      text: '菱形',
    },
    {
      id: 'test_image_1',
      type: 'test-image',
      x: 300,
      y: 200,
      text: {
        x: 420,
        y: 200,
        value: '通过相对路径引入的图片\n实际这张图片放在了\n项目的public目录下',
      },
      properties: {
        width: 82,
        height: 96,
        textStyle: {
          textAlign: 'left',
        },
      },
    },
  ],
  edges: [
    {
      id: 'polyline_1',
      type: 'polyline',
      sourceNodeId: 'rect_1',
      targetNodeId: 'rect_2',
    },
    {
      id: 'e_3',
      type: 'polyline',
      sourceNodeId: '3',
      targetNodeId: '5',
    },
  ],
};
