import { h, Component } from 'preact';
import { observer } from '../../util/stateUtil';
import GraphModel from '../../model/GraphModel';

type IProps = {
  graphModel: GraphModel;
};

@observer
export default class ModificationOverlay extends Component<IProps> {
  render() {
    const {
      graphModel: {
        transformModel,
      },
    } = this.props;
    const { transform } = transformModel.getTransformStyle();
    const { children } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100%"
        className="modification-overlay"
      >
        <g transform={transform}>
          {children}
        </g>
      </svg>
    );
  }
}
