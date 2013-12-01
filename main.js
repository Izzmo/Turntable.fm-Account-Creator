window.si = setInterval(function() {
  var first_names = ['James', 'John', 'Robert', 'Nick', 'Michael', 'William', 'David', 'Richard', 'Charles', 'Joseph', 'Kenneth', 'Anthony', 'Kevin', 'Travis', 'Andrew', 'Paul', 'Dick', 'Gary', 'Jeffrey', 'Stephen', 'Eric', 'Scott', 'Frank', 'Perry', 'Ross', 'Virgil', 'Andy', 'Marshall', 'Ian', 'Wallace', 'Ken', 'Bob', 'Jaimie', 'Jamie', 'Casey', 'Alfredo', 'Alberto', 'Dave', 'Ivan', 'Johnnie', 'Sidney', 'Byron', 'Julian', 'Isaac', 'Morris', 'Clifton', 'Cliff', 'Daryl', 'Rene', 'Irene', 'Seth', 'Kent', 'Eduardo', 'Wade', 'Freddie', 'Tarrence'],
      last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'Hill', 'Young', 'Allen', 'Hall', 'Clark', 'Lewis', 'Lee', 'Adams', 'Walker', 'Wood', 'Ross', 'Sanders', 'Holcomb', 'England', 'Finch', 'Head', 'Burt', 'Hendrix', 'Sosa', 'Haney', 'Franks', 'Sargent', 'Nieves', 'Downs', 'Rasmussen', 'Bird', 'Hewitt', 'Lindsay', 'Foreman', 'Valencia', 'Oneil', 'Delacruz', 'Vinson', 'Dejesus', 'Hyde', 'Forbes', 'Gilliam', 'Guthrie', 'Wooten', 'Huber', 'Barlow', 'Boyle', 'McMahon', 'Buckner'];

  var getName = function() {
    var fn = first_names[Math.floor(Math.random() * first_names.length)];
    var ln = last_names[Math.floor(Math.random() * last_names.length)];

    return [fn, ln];
  }
  var n = getName();
  // get token
  var token = '', userid = '', auth = '';
  $.ajax('https://turntable.fm', {
    success: function(data) {
      var res = data.match(/TURNTABLE_TOKEN \= \"([a-z0-9]+)\"/);
      token = res[1];

      if(token === '') return false;

      $.ajax({
        url: 'https://turntable.fm/api/user.guest_create',
        type: 'post',
        data: {
          client: 'web',
          fingerprint: 'fce2ee292bf5c30f3379104cd6d9e1747e841293',
          usertoken: token
        },
        success: function(data) {
          // expected: [true, {"userid": "529a14e9eb35c15e1ab593dc", "userauth": "xqklorkyQBYJDMrutQwPYfFy"}]
          console.log('create');
          if(!data[0]) {
            console.log('create error: ' + data[1].err);
            return false;
          }

          auth = data[1].userauth;
          userid = data[1].userid;
          var num = Math.floor((Math.random()*100)+1);

          $.ajax({
            url: 'https://turntable.fm/api/user.guest_register',
            type: 'post',
            data: {
              avatarid: 8,
              client: "web",
              email: n[0] + '_' + n[1] + num + '@izzmo.com',
              fingerprint: "fce2ee292bf5c30f3379104cd6d9e1747e841293",
              name: n[0] + ' ' + n[1] + ' ' + num,
              password: "ABcd 1234",
              userauth: auth,
              userid: userid
            },
            success: function(data) {
              // response: [true, {"userid": "529a14e9eb35c15e1ab593dc", "userauth": "xqklorkyQBYJDMrutQwPYfFy"}]
              console.log('register');
              if(!data[0])
                console.log('register error: ' + data[1].err);
              else
                window.userids.push(data[1]);
            }
          });
        }
      });
    }
  });
}, 1000);
