import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart';
import 'dart:convert';

class SizeConfig {
  static MediaQueryData _mediaQueryData;
  static double screenWidth;
  static double screenHeight;
  static double blockSizeHorizontal;
  static double blockSizeVertical;

  void init(BuildContext context) {
    _mediaQueryData = MediaQuery.of(context);
    screenWidth = _mediaQueryData.size.width;
    screenHeight = _mediaQueryData.size.height;
    blockSizeHorizontal = screenWidth / 100;
    blockSizeVertical = screenHeight / 100;
  }
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => new _HomeState();
}

class _HomeState extends State<Home> {

  //URL for heroku api endpoints goes here
  String url = 'https://mern-morse-code-translator.herokuapp.com/login';


  Future<Map<String, dynamic>> getData(String email, String password) async {

    Response response = await post(
      url,
      headers: <String, String> {
        'Content-Type': 'application/json'
//        'Content-Type': 'application/json; charset=UTF-8',

      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );
    data = jsonDecode(response.body);
    print(data);
    return data;
    //print("returned: " + data.toString());
  }

  String $givenEmail = "";
  String $givenPassword = "";
  Map<String, dynamic> data = {};



  void parseResponse(Map<String, dynamic> value)
  {

    //print(value['userName']);


      if (value['user'] != null) {
        String userName = value['user']['userName'];
        String email = value['user']['email'];

        print(email);
        print(userName);
        if ((email != null) && (userName != null))
          Navigator.pushNamed(context, '/menu',
              arguments: {'userName': userName, 'email': email,});
      }
      else
        {
          //Navigator.of(context).pop()
          print(value['msg']);

        }



  }


  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return new Scaffold(
        backgroundColor: Colors.grey[200],
        resizeToAvoidBottomPadding: false,
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,

          children: <Widget>[
            Container(
              child: Stack(
                children: <Widget>[
                  Container(
                    padding: EdgeInsets.fromLTRB(15.0, 50.0, 0.0, 0.0),
                    child: Text('My',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                  Container(
                    padding: EdgeInsets.fromLTRB(15.0, 150.0, 0.0, 0.0),
                    child: Text('Morse',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
            Container(
                padding: EdgeInsets.only(top: 10.0, left: 20.0, right: 20.0),
                child: Column(
                  children: <Widget>[
                    TextField(
                      onChanged: (text) {
                        $givenEmail = text;
                      },
                      decoration: InputDecoration(
                          labelText: 'Email',
                          labelStyle: TextStyle(
                              fontFamily: 'Montserrat',
                              fontWeight: FontWeight.bold,
                              color: Colors.grey),
                          focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.deepOrange))),
                    ),
                    SizedBox(height: SizeConfig.blockSizeVertical *2),
                    TextField(
                      onChanged: (text) {
                        $givenPassword = text;
                      },
                      decoration: InputDecoration(
                          labelText: 'Password',
                          labelStyle: TextStyle(
                              fontFamily: 'Montserrat',
                              fontWeight: FontWeight.bold,
                              color: Colors.grey),
                          focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.deepOrange))),
                      obscureText: true,
                    ),
                    SizedBox(height: SizeConfig.blockSizeVertical *2),
                    Container(
                      height: SizeConfig.blockSizeVertical *6,
                      child: Material(
                        borderRadius: BorderRadius.circular(20.0),
                        color: Colors.deepOrange,
                        elevation: 7.0,
                        child: InkWell(
                          onTap: () {

                            print($givenEmail);
                            print($givenPassword);

                            //Map<String, dynamic> myTest = {"userName" : "thisUser","email":"thisEmail"};

                            //await getData($givenEmail, $givenPassword);

                            getData($givenEmail, $givenPassword).then((value) =>
                            //This is what the page does when the API endpoint responds
                              //  print("returned: " + data.toString())
                                //print(value),
                                //parseResponse(value);
                                parseResponse(value)
                                //jsonDecode(data);
                                //Navigator.of(context).pushNamed('/menu', arguments: );

                            );
                            //this is what the page will do immediately, without waiting for a response from the server
                            //print("returned: " + data.toString());
                            },
                          child: Center(
                            child: Text(
                              'Login',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Montserrat'),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                )),
            SizedBox(height: SizeConfig.blockSizeVertical *2),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(width: SizeConfig.blockSizeHorizontal *.5),
                InkWell(
                  onTap: () {
                    Navigator.of(context).pushNamed('/forgot');
                  },
                  child: Text(
                    'Forgot My Password',
                    style: TextStyle(
                        color: Colors.deepOrange,
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline),
                  ),
                ),
              ],
            ),



            // THIS ROW IS FOR DEBUG ONLY
            /*SizedBox(height: SizeConfig.blockSizeVertical *2),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(width: SizeConfig.blockSizeHorizontal *.5),
                InkWell(
                  onTap: () {
                    Navigator.of(context).pushNamed('/menu');
                  },
                  child: Text(
                    'DEBUG ONLY: Go to Menu Page',
                    style: TextStyle(
                        color: Colors.deepOrange,
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline),
                  ),
                ),
              ],
            ),
            */



            SizedBox(height: SizeConfig.blockSizeVertical *.5),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(width: SizeConfig.blockSizeHorizontal *.5),
                InkWell(
                  onTap: () {
                    Navigator.pushNamed(context, '/signup');
                  },
                  child: Text(
                    'Sign Up',
                    style: TextStyle(
                        color: Colors.deepOrange,
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline),
                  ),
                ),
              ],
            ),
          ],
        ));
  }
}