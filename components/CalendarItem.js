/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Switch,
} from 'react-native';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import { updateCalendarEvent } from '../store/actions/calendarEvent';

const LeftActions = () => {
  // const [showEditModal, setshowEditModal] = false;
  // const setShowModal = () => { !showEditModal; };
  return (
    <View style={styles.swipeContainer}>
      {/* <TouchableOpacity style={styles.swipeItem} onPress={() => setshowEditModal(!showEditModal)}> */}
      <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed edit button')}>
        <Text style={styles.swipeItemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed delete button')}>
        <Text style={styles.swipeItemText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const CalendarItem = (props) => {
  const [showLetsTalkModal, setshowLetsTalkModal] = useState(false);
  const {
    id, title, start, end, author, user, updateEvent, approvals, users,
  } = props;

  const handleApprove = () => {
    updateEvent(id, { approvals: [...approvals, user.id] }, users.map(({ usersId }) => usersId));
  };

  return (
    <View style={styles.container}>
      {user.id === author.id
        ? (
          <View>
            <Swipeable renderLeftActions={LeftActions}>
              <View style={styles.eventContainer}>
                <Text style={styles.icon}>{`${author} icon`}</Text>
                <View style={styles.description}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
                </View>
                <Text style={styles.text}># of Likes</Text>
              </View>
            </Swipeable>
          </View>
        )
        : (
          <View>
            <View style={styles.eventContainer}>
              <Text style={styles.icon}>{`${author} icon`}</Text>
              <View style={styles.description}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
              </View>
              <Text style={styles.text}># of Likes</Text>
            </View>
            <View style={styles.approveContainer}>
              <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
                <View>
                  <Text>Approve</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.letsTalkButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                <Text>Let's Talk</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal
                animationType="fade"
                visible={showLetsTalkModal}
                transparent
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}
              >
                <View style={styles.swipeModalContainer}>
                  <TouchableOpacity style={styles.exitButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                    <Text style={styles.text}>X</Text>
                  </TouchableOpacity>

                  <Text style={styles.icon}>INSERT CALENDAR LOGO INSERT CALENDAR LOGO INSERT CALENDAR LOGO</Text>
                  <View style={styles.description}>
                    <Text style={styles.title}>EDIT EVENT</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Title</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputTitle}
                        defaultValue={`${title}`}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>All-Day</Text>
                    <View style={styles.inputContainer}>
                      <Switch />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Start</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputTime}
                        defaultValue={`${moment(start).format('MMM DD')}`}
                      />
                      <TextInput
                        style={styles.inputTime}
                        defaultValue={`${moment(start).format('h:mm a')}`}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>End</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.inputTime}
                        defaultValue={`${moment(end).format('MMM DD')}`}
                      />
                      <TextInput
                        style={styles.inputTime}
                        defaultValue={`${moment(end).format('h:mm a')}`}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                      <Text style={{ color: '#FFFFFF' }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            {/* <View>
              <Modal
                animationType="fade"
                visible={showLetsTalkModal}
                transparent
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}
              >
                <View style={styles.letsTalkModalContainer}>
                  <View style={styles.description}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Message</Text>
                    <TextInput
                      style={styles.inputTitle}
                      placeholder="Optional"
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                      <Text style={{ color: '#FFFFFF' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                      <Text style={{ color: '#FFFFFF' }}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View> */}
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  swipeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSageGreen,
  },
  eventContainer: {
    height: 80,
    width: dimensions.screenWidth * 0.9,
    backgroundColor: colors.backgroundSageGreen,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  approveContainer: {
    backgroundColor: colors.backgroundSageGreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  letsTalkModalContainer: {
    backgroundColor: colors.backgroundSageGreen,
    width: dimensions.screenWidth * 0.8,
    height: 140,
    marginTop: dimensions.screenHeight * 0.3,
    margin: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 60,
    shadowOpacity: 0.2,
  },
  swipeModalContainer: {
    backgroundColor: colors.backgroundSageGreen,
    width: dimensions.screenWidth * 0.8,
    height: dimensions.screenHeight * 0.5,
    marginTop: dimensions.screenHeight * 0.2,
    margin: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 60,
    shadowOpacity: 0.2,
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    width: dimensions.screenWidth * 0.5,
  },
  title: {
    fontSize: fonts.largeText,
    color: colors.darkSageGreen,
    fontWeight: '600',
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,
  },
  approveButton: {
    backgroundColor: '#52BE64',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
  letsTalkButton: {
    backgroundColor: '#3398FF',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
  inputTitle: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.4,
    marginLeft: 10,
    height: dimensions.screenHeight * 0.03,
  },
  inputTime: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.2,
    marginLeft: 10,
    height: dimensions.screenHeight * 0.03,
  },
  modalButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.03,
    margin: 10,
  },
  swipeItem: {
    backgroundColor: colors.darkSageGreen,
    justifyContent: 'center',
    padding: 10,
    width: 60,
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
  inputContainer: {
    width: dimensions.screenWidth * 0.5,
    flexDirection: 'row',
  },
  exitButton: {
    borderWidth: 3,
    borderColor: colors.darkSageGreen,
    borderRadius: 20,

    width: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.04,
    marginRight: dimensions.screenWidth * 0.6,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
    user: state.user.user,
    calendarEvents: state.calendarEvent.allCalendarEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (id, calendarEvent, users) => {
      dispatch(updateCalendarEvent(id, calendarEvent, users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarItem);
