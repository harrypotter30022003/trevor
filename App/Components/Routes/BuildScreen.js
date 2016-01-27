import React from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import moment from 'moment';
require('moment-duration-format');

var {
  LinkingIOS,
  IntentAndroid,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  View
} = React;

import Api from '../../Utils/Api';
import CustomRefreshControl from '../../Helpers/CustomRefreshControl';
import DetailRow from '../../Helpers/DetailRow';
import Divider from '../../Helpers/Divider';
import Loading from '../Loading';
import JobsListView from '../JobsListView';
import StatusSidebar from '../StatusSidebar';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  buildDetailsWrapper: {
    flexDirection: 'row',
    flex: 1,
    height: 95,
    justifyContent: 'center',
  },
  buildDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  buildDetailsText: {
    fontSize: 16,
  },
  commitMessage: {
    fontWeight: 'bold'
  },
  commitInfo: {
    padding: 15
  },
  githubButtonWrapper: {
    marginTop: 10
  },
  githubButton: {
    backgroundColor: '#2d2d2d',
  }
});

export default class BuildScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      build: {},
      commit: {},
      jobs: []
    };
  }

  componentWillMount() {
    this.fetchData(refresh = false);
  }

  fetchData(refresh) {
    if (refresh) {
      this.setState({
        refreshing: true
      });
    } else {
      this.setState({
        loading: true
      });
    }

    var self = this;

    Api.getBuild(this.props.buildId, this.props.isPro)
      .then(function (res) {
        console.log(res);
        if (refresh) {
          self.setState({
            refreshing: false,
            build: res.build,
            commit: res.commit,
            jobs: res.jobs
          });
        } else {
          self.setState({
            loading: false,
            build: res.build,
            commit: res.commit,
            jobs: res.jobs
          });
        }
      });
  }

  openGitHub() {
    const url = this.state.commit.compare_url;
    if (Platform.OS === 'ios'){
      LinkingIOS.openURL(url);
    } else {
      IntentAndroid.openURL(url);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading text='Build' />
      );
    }

    const date = this.state.build.duration ? 'Finished ' + moment(this.state.build.finished_at).fromNow() :
      'Started ' + moment(this.state.build.started_at).fromNow();

    const duration = moment.duration(this.state.build.duration, 'seconds')
      .format('[Run for] m [minutes], s [seconds]');

    const prText = this.state.build.pull_request ? this.state.build.pull_request_number + ': '
      + this.state.build.pull_request_title : null;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <CustomRefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchData.bind(this, refresh = true)} />
        }>

        <Divider text='Build Details'></Divider>
        <View style={styles.buildDetailsWrapper}>
          <StatusSidebar buildState={this.state.build.state} buildNumber={this.state.build.number} />
          <View style={styles.buildDetails}>
            <Text style={[styles.commitMessage, styles.buildDetailsText]} numberOfLines={2}>
              {this.state.commit.message}
            </Text>
            <Text style={styles.buildDetailsText}>{date}</Text>
            <Text style={styles.buildDetailsText}>Run for {duration}</Text>
          </View>
        </View>

        <Divider text='Commit Info'></Divider>
        <View style={styles.commitInfo}>
          <DetailRow icon='person' text={this.state.commit.author_name} />
          {prText ? ( <DetailRow icon='git-pull-request' text={prText} /> ) : null}
          <DetailRow icon='git-branch' text={this.state.commit.branch} />

          {this.props.isPro ? null : (
            <View style={styles.githubButtonWrapper}>
              <Icon.Button
                style={styles.githubButton}
                onPress={this.openGitHub.bind(this)}
                name='mark-github'>
                  Compare commit on GitHub
              </Icon.Button>
            </View>
          )}
        </View>

        <Divider text='Jobs'></Divider>
        <JobsListView
          jobs={this.state.jobs}
          isPro={this.props.isPro}
          navigator={this.props.navigator} />
      </ScrollView>
    );
  }
};
