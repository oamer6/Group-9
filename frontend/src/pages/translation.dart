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

class Translation extends StatefulWidget {
  @override
  _TranslationState createState() => _TranslationState();
}

class _TranslationState extends State<Translation> {

  String url = 'https://mern-morse-code-translator.herokuapp.com/storemessage';

  Future<Map<String, dynamic>> getData(String message, String userName) async {

    Response response = await post(
      url,
      headers: <String, String> {
        'Content-Type': 'application/json',

      },
      body: jsonEncode(<String, String>{
        'message': message,
        'userName': userName,
      }),
    );
    data = jsonDecode(response.body);
//    routedData.update('morseMessage', (value) => data['morseMessage'], ifAbsent: () => data['morseMessage']);
//    routedData.update('message', (value) => data['message'], ifAbsent: () => data['message']);
    //routedData.put('morse' : data['morse']);

    print(data['morse']);
    routedData['morse'] = data['morse'];
    routedData['message'] = data['message'];
    return data;

  }

  @override
  void initState(){
    super.initState();
    }

  String $message;
  Map<String,dynamic> data = {};

  Map<String, dynamic> routedData = {};



  void parseResponse(Map<String, dynamic> value)
  {



    Navigator.pushNamed(context, '/display', arguments: routedData);
  }





  @override
  Widget build(BuildContext context) {


    routedData = ModalRoute.of(context).settings.arguments;

//    print(routedData['userName']);

    print(routedData);

    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('My Morse'),
        centerTitle: true,
        elevation: 0,
      ),
    body: Center(
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            SizedBox(height: SizeConfig.blockSizeVertical *2),
            /*
            Row(
              children: <Widget>[
                SizedBox(width: SizeConfig.blockSizeVertical *.2),


                InkWell(
                  onTap: () {
                    Navigator.of(context).pushNamed('/display');
                  },
                  child: Text(
                    'DEBUG ONLY: Go to Display Page',
                    style: TextStyle(
                        color: Colors.deepOrange,
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        fontSize: SizeConfig.blockSizeVertical *2,
                        decoration: TextDecoration.underline),
                  ),
                ),
              ],
            ),
            */

            TextField(
              onChanged: (text) {
                $message = text;
              },
              textAlign: TextAlign.center,
              textAlignVertical: TextAlignVertical.center,
              decoration: InputDecoration(
                hintText: 'Type a message'
                    // make variable
              ),
            ),
            SizedBox(height: SizeConfig.blockSizeVertical *2),

            InkWell(
              onTap: () {
                print($message);
                print(routedData['userName']);
                if ($message != null)
                getData($message, routedData['userName']).then((value) =>
                //This is what the page does when the API endpoint responds
                //print("returned: " + data.toString())
                  parseResponse(value)
                );

                //parseResponse();


              },
              child: Container(
                height: SizeConfig.blockSizeVertical *5,
                child: Material(
                 borderRadius: BorderRadius.circular(20.0),
                 color: Colors.deepOrange,
                 elevation: 7.0,

                  child: Center(
                    child: Text(
                      'Translate',
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
        )
      )
    )
    );
  }
}