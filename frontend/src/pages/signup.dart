import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'dart:convert';
import 'package:http/http.dart';

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

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {

  String url = 'https://mern-morse-code-translator.herokuapp.com/register';

  Future<Map<String, dynamic>> getData(String email, String password, String verifyPassword, String userName) async {

    Response response = await post(
      url,
      headers: <String, String> {
        'Content-Type': 'application/json',

      },
      body: jsonEncode(<String, String>{
        "email": email,
        "password": password,
        "verifyPassword": verifyPassword,
        "userName": userName,
      }),
    );

    data = jsonDecode(response.body);
    return data;


  }

  String $givenEmail = "";
  String $givenPassword = "";
  String $givenVerifyPassword = "";
  String $givenUserName = "";
  Map<String, dynamic> data = {};

  @override
  void initState(){
    super.initState();

  }


  void parseResponse(Map<String, dynamic> value)
  {


    if(null != value['msg']) {
      print(value['msg']);
      return;
    }


    print(value);
    Navigator.of(context).pop();





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
                    child: Text('Sign',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                  Container(
                    padding: EdgeInsets.fromLTRB(15.0, 150.0, 0.0, 0.0),
                    child: Text('Up',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
            Container(
                padding: EdgeInsets.only(top: 35.0, left: 20.0, right: 20.0),
                child: Column(
                  children: <Widget>[
                    TextField(
                      onChanged:
                      (text) {
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
                    TextField(
                      onChanged: (text) {
                        $givenUserName = text;
                        },
                      decoration: InputDecoration(
                          labelText: 'User Name',
                          labelStyle: TextStyle(
                              fontFamily: 'Montserrat',
                              fontWeight: FontWeight.bold,
                              color: Colors.grey),
                          focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.deepOrange))),
                    ),
                    SizedBox(height: SizeConfig.blockSizeVertical *2.5),
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
                    TextField(
                      onChanged: (text) {
                        $givenVerifyPassword = text;
                        },
                      decoration: InputDecoration(
                          labelText: 'Confirm Password',
                          labelStyle: TextStyle(
                              fontFamily: 'Montserrat',
                              fontWeight: FontWeight.bold,
                              color: Colors.grey),
                          focusedBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.deepOrange))),
                      obscureText: true,
                    ),
                    SizedBox(height: SizeConfig.blockSizeVertical *.2),
                    SizedBox(height: SizeConfig.blockSizeVertical *2.5),
                    GestureDetector(
                      onTap: () {

                      print($givenEmail);
                      print($givenPassword);
                      print($givenVerifyPassword);
                      print($givenUserName);

                      getData($givenEmail, $givenPassword, $givenVerifyPassword, $givenUserName).then((value) =>
                     //This is what the page does when the API endpoint responds
                      parseResponse(value)
                        //print("returned: " + data.toString())
                      );
                       //this is what the page will do immediately, without waiting for a response from the server
                      //print("returned: " + data.toString());
                      //
                      },
                      child: Container(
                        height: SizeConfig.blockSizeVertical *5,
                        child: Material(
                          borderRadius: BorderRadius.circular(20.0),
                          color: Colors.deepOrange,
                          elevation: 7.0,

                          child: Center(
                            child: Text(
                              'Sign Me Up',
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
                SizedBox(width: SizeConfig.blockSizeVertical *.2),
                InkWell(
                  onTap: () {
                    Navigator.pushNamed(context, '/home');
                  },
                  child: Text(
                    'Changed your mind? Go back to home page.',
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