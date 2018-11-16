// debug mode
const DEBUG = false;

export default {
  // debug
  DEBUG: DEBUG,
  // initial state (for dev)
  initialState: {
    chapter: 0, // 0
    prologue: {
      disclaimer: true, // true
      chapterTrigger: false
    },
    chapter1: {
      titleBanner: true, // true
      header1: true, // true
      companyChatTrigger: true, // true
      companyChat: false,
      esotericMailTrigger: false,
      esotericMail: false,
      chapterTrigger: false
    },
    chapter2: {
      titleBanner: true, // true
      deliveryTrigger: true, // true
      delivery: false,
      flashdrive: false,
      briefcaseLock: false,
      briefcase: false,
      drEvilMailTrigger: false,
      drEvilMail: false,
      chapterTrigger: false
    },
    chapter3: {
      titleBanner: true, // true
      amazingAtomicActivityTrigger: true, // true
      amazingAtomicActvity: false,
      header1Trigger: false,
      header1: false,
      creditCardTrigger: false,
      creditCard: false,
      selfReminder: false,
      driverFinder: false,
      chapterTrigger: false
    },
    chapter4: {
      titleBanner: true, // true
      cityRideTrigger: true, // true
      cityRide: false,
      header: false,
      gatemanTrigger: false,
      gateman: false,
      forgotHeader: false,
      gateTrigger: false,
      filmReel: false,
      gateCode: false,
      preEndRideHeader: false,
      endRide: false,
      driverRating: false,
      chapterTrigger: false
    },
    chapter5: {
      titleBanner: true, // true
      header1: true, // true
      wifiTrigger: true, // true
      wifiPassword: false,
      snifferTigger: false,
      sniffer: false,
      evilChatTrigger: false,
      evilChat: false,
      evilPlanTrigger: false,
      evilPlan: false,
      chapterTrigger: false
    },
    chapter6: {
      titleBanner: true, // true
      mailTrigger: true, // true
      mail: false,
      manual: false,
      decrocoder: false,
      battery: false,
      reactorTrigger: false,
      reactor: false,
      timeTravel: false,
      kaputt: false,
      fameTrigger: false,
      fame: false,
      chapterTrigger: false
    },
    chapter7: {
      titleBanner: true, // true
      chatTrigger: true, // true
      chat: false,
      box: false,
      endTrigger: false
    }
  },
  // timers
  'chapter1.companyChat.baseMs': dbg(100),
  'chapter2.delivery.timeout': dbg(2000),
  'chapter4.cityRide.time': dbg(12000),
  'chapter4.endRide.time': dbg(6000),
  'chapter4.gatemanStory.timeout': dbg(4000),
  'chapter5.evilChat.baseMs': dbg(120),
  'chapter7.chat.baseMs': dbg(120)
};

function dbg (value, debugValue = 1) {
  if (DEBUG) {
    return debugValue;
  }

  return value;
}
