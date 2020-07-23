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

class Send extends StatefulWidget {
  @override
  _SendState createState() => _SendState();
}

class _SendState extends State<Send> {

  String url = 'https://mern-morse-code-translator.herokuapp.com/sendmessage';

  Future<Map<String, dynamic>> getData(String message, String morse, String sender, String receiver) async {

    Response response = await post(
      url,
      headers: <String, String> {
        'Content-Type': 'application/json',

      },
      body: jsonEncode(<String, String>{
        "message": message,
        "morse": morse,
        "sender": sender,
        "receiver": receiver,
      }),
    );

    data = jsonDecode(response.body);
    return data;
    //print("returned: " + data.toString());

  }

  @override
  void initState(){
    super.initState();
  }


  String $toThisUserName = "";
  Map<String,dynamic> data = {};

  void parseResponse(Map<String, dynamic> value) {
    print(value);
    Navigator.of(context).pop();
  }



  Map routedData = {};



  @override
  Widget build(BuildContext context) {


    routedData = ModalRoute.of(context).settings.arguments;
    print(routedData);



    SizeConfig().init(context);
    return new Scaffold(
        backgroundColor: Colors.grey[200],
        resizeToAvoidBottomPadding: false,
        appBar: AppBar(
          backgroundColor: Colors.deepOrange,
          title: Text('Send Message'),
          centerTitle: true,
          elevation: 0,
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
                padding: EdgeInsets.only(top: 35.0, left: 20.0, right: 20.0),
                child: Column(
                  children: <Widget>[
                    Container(
                        padding: EdgeInsets.only(top: 35.0, left: 20.0, right: 20.0),
                        child: Column(
                          children: <Widget>[
                            TextField(
                              onChanged: (text) {
                                $toThisUserName = text;
                              },
                              decoration: InputDecoration(
                                  labelText: 'User Name of Recipient',
                                  labelStyle: TextStyle(
                                      fontFamily: 'Montserrat',
                                      fontWeight: FontWeight.bold,
                                      color: Colors.grey),
                                  focusedBorder: UnderlineInputBorder(
                                      borderSide: BorderSide(color: Colors.deepOrange))),
                            ),
                          ],
                        )),
                    SizedBox(height: SizeConfig.blockSizeVertical *2),
                    GestureDetector(
                      onTap: () {
                      print("test");
                      if("" != $toThisUserName)
                        getData(routedData['message'], routedData['morse'], routedData['userName'], $toThisUserName).then(
                                (value) => parseResponse(value)
                        );
                      },
                    child: Container(
                      height: SizeConfig.blockSizeVertical *5,
                      child: Material(
                        borderRadius: BorderRadius.circular(20.0),
                        color: Colors.deepOrange,
                        elevation: 7.0,
                          child: Center(
                            child: Text(
                              'Send My Message',
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
          ],
        ));
  }
}