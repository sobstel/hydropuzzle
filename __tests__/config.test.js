import config from '@src/config';

const expectedConfig = {
  DEBUG: false,
  initialState: {
    chapter: 0,
    prologue: {
      disclaimer: true,
      chapterTrigger: false
    },
    chapter1: {
      titleBanner: true,
      header1: true,
      companyChatTrigger: true,
      companyChat: false,
      esotericMailTrigger: false,
      esotericMail: false,
      chapterTrigger: false
    },
    chapter2: {
      titleBanner: true,
      deliveryTrigger: true,
      delivery: false,
      flashdrive: false,
      briefcaseLock: false,
      briefcase: false,
      drEvilMailTrigger: false,
      drEvilMail: false,
      chapterTrigger: false
    },
    chapter3: {
      titleBanner: true,
      amazingAtomicActivityTrigger: true,
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
      titleBanner: true,
      cityRideTrigger: true,
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
      titleBanner: true,
      header1: true,
      wifiTrigger: true,
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
      titleBanner: true,
      mailTrigger: true,
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
      titleBanner: true,
      chatTrigger: true,
      chat: false,
      box: false,
      endTrigger: false
    }
  },
  // timers
  'chapter1.companyChat.baseMs': 100,
  'chapter2.delivery.timeout': 2000,
  'chapter4.cityRide.time': 12000,
  'chapter4.endRide.time': 6000,
  'chapter4.gatemanStory.timeout': 4000,
  'chapter5.evilChat.baseMs': 120,
  'chapter7.chat.baseMs': 120
};

it('configured correctly', () => {
  expect(config).toEqual(expectedConfig);
});
