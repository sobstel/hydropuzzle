import React, { PureComponent } from 'react';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class HImage extends PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    source: PropTypes.number.isRequired
  }

  static defaultProps = {
    containerStyle: []
  }

  state = {
    height: 0,
    width: 0
  }

  render () {
    let containerStyles = this.props.containerStyle;
    if (this.state.height > 0) {
      containerStyles = [containerStyles, {height: this.state.height}];
    }

    return (
      <View onLayout={this.onContainerLayout} style={containerStyles}>
        <Image
          {...this.props}
          style={[this.props.style, {width: this.state.width, height: this.state.height}]} />
      </View>
    );
  }

  onContainerLayout = (event) => {
    const containerWidth = event.nativeEvent.layout.width;
    const { width, height } = Image.resolveAssetSource(this.props.source);

    this.setState({
      width: containerWidth,
      height: containerWidth / (width / height)
    });
  }
}

export default HImage;
