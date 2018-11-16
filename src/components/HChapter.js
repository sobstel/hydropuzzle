import React, { PureComponent } from 'react';
import { Image, KeyboardAvoidingView, LayoutAnimation, Platform, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import EStyleSheet from 'react-native-extended-stylesheet';
import resolveAssetSource from 'resolveAssetSource';
import { rwidth, rheight } from '@lib/rsize';

import HTitleBanner from '@components/HTitleBanner';

import images from '@images';

/**
 * Hydro: scrollable chapter
 */
class HChapter extends PureComponent {
  static propTypes = {
    completed: PropTypes.bool,
    levelChange: PropTypes.number.isRequired,
    lowerTitle: PropTypes.string,
    onPrevChapter: PropTypes.func.isRequired,
    scrollable: PropTypes.bool,
    showTitleBanner: PropTypes.bool,
    titleImage: PropTypes.number,
    upperTitle: PropTypes.string
  }

  static defaultProps = {
    completed: false,
    lowerTitle: '',
    scrollable: true,
    showTitleBanner: false,
    titleImage: null,
    upperTitle: ''
  }

  scrollView = null;
  contentSizeChangeTimeout = null;
  keyboardDidShowListener = null;
  keyboardDidHideListener = null;

  state = {
    started: false,
    contentSize: {
      width: 0,
      height: 0
    }
  };

  componentDidMount () {
    if (this.props.completed && this.props.levelChange === -1) {
      // give time to render before scrolling down
      this.props.setTimeout(() => {
        this.scrollView && this.scrollView.scrollToEnd({animated: false});
        this.setState({started: true});
      }, 800);
      return;
    }
    this.setState({started: true});
  }

  componentWillUnmount () {
    LayoutAnimation.spring();
  }

  render () {
    return (
      <KeyboardAvoidingView behavior={Platform.select({ios: 'position', android: null})}>
        {!this.state.started &&
          <View style={styles.contentContainer}>
            {this.renderBackgroundImage(rheight(100))}
          </View>
        }

        <ScrollView
          bounces={false}
          bouncesZoom={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardDismissMode='on-drag'
          scrollEnabled={this.props.completed || this.props.scrollable}
          removeClippedSubviews={Platform.select({ios: null, android: true})}
          {...this.props}
          onContentSizeChange={this.onContentSizeChange}
          contentContainerStyle={styles.scrollView}
          ref={(scrollView) => this.scrollView = scrollView}>

          {this.renderBackgroundImage(this.state.contentSize.height)}
          {this.renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  renderBackgroundImage (containerHeight) {
    const { width, height } = resolveAssetSource(images.bg);

    const bgWidth = rwidth(100);
    const bgHeight = rwidth(100) / (width / height);

    let background = [];

    for (let top = 0; top < containerHeight; top += bgHeight) {
      const bgStyles = {top, width: bgWidth, height: bgHeight};
      background.push(<Image source={images.bg} style={[styles.bg, bgStyles]} key={top} />);
    }

    return background;
  }

  renderContent () {
    return (
      <View
        style={styles.contentContainer}>

        {this.props.showTitleBanner &&
          <HTitleBanner
            upperTitle={this.props.upperTitle}
            lowerTitle={this.props.lowerTitle}
            titleImage={this.props.titleImage}
            onChapterUp={this.onChapterUp}
            onChapterDown={this.onChapterDown}
            completed={this.props.completed} />
        }

        {this.props.children}
      </View>
    );
  }

  onContentSizeChange = (width, height) => {
    this.props.clearTimeout(this.contentSizeChangeTimeout);

    // timeout prevents sliding too early when subelements are rendered
    this.contentSizeChangeTimeout = this.props.setTimeout(() => {
      const prevHeight = this.state.contentSize.height;
      const windowHeight = rheight(100);

      this.setState({contentSize: {width, height}});

      if (!this.props.completed && height > windowHeight) {
        // if content height increased
        if (height > prevHeight) {
          const maxHeight = (height - windowHeight);
          const y = Math.min(maxHeight, prevHeight);

          this.scrollTo(y);
        }

        // experimental (otherwise, black space remains)
        // if (iphonex() && height < prevHeight) {
        //   this.scrollTo(height - windowHeight);
        // }
      }
    }, 200);
  }

  scrollTo = (y) => {
    this.scrollView && this.scrollView.scrollTo({x: 0, y: y, animated: true});
  }

  onChapterUp = () => {
    this.props.onPrevChapter();
  }

  onChapterDown = () => {
    this.scrollView && this.scrollView.scrollToEnd({ animated: true });
  }
}

export default ReactTimeout(HChapter);

const styles = EStyleSheet.create({
  contentContainer: {
    flex: 1,
    width: rwidth(100),
    minHeight: rheight(100),
    alignItems: 'center'
  },
  bg: {
    position: 'absolute',
    left: 0,
    resizeMode: Image.resizeMode.cover
  },
  scrollView: {
  }
});
