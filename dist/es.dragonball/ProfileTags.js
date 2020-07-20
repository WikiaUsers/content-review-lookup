// Tags
window.UserTagsJS = {

  tags: {
     chatmoderator: {
          link: 'Special:ListUsers/chatmoderator'
      },
      rollback: {
          link: 'Special:ListUsers/rollback'
      },

     
      park: {
          link: 'Special:ListUsers'
      },


  },
  modules: {
      autoconfirmed: true,
      inactive: {
          days: 60,
          namespaces: [0],
          zeroIsInactive: true
      },
      mwGroups: [
          'chatmoderator',
          'rollback',
          'Vigilant',
      ],
      newuser: true
  }


};