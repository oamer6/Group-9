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

class LoadingInbox extends StatefulWidget {
  @override
  _LoadingInboxState createState() => _LoadingInboxState();
}

class _LoadingInboxState extends State<LoadingInbox>{

  @override
  void initState(){
    super.initState();

  }



  Future<Map<String, dynamic>> getData(String userName) async {
    print(userName);
    Response response = await post(
      url,
      headers: <String, String> {
        'Content-Type': 'application/json'
//        'Content-Type': 'application/json; charset=UTF-8',

      },
      body: jsonEncode(<String, String>{
        'userName': userName,
      }),
    );

    data = jsonDecode(response.body);
    print("IN GETDATA FUNCTION:");
    print(data);
    return data;

    //print(data);
    //print("returned: " + data.toString());
  }


  String url = 'https://mern-morse-code-translator.herokuapp.com/displaymessage';


  //Map<String, List<Map<String, String>>> data = {};
  Map<String, dynamic> data = {};


  void parseResponse(Map<String, dynamic> value)
  {


    //print(value['userName']);
    print(value);

    if (value['results'] != null) {
      print("THE DATA:");
      print(data['results']);

      //List $messages = data['results'];

      //Map <String, List> messages = data;

      //try {
        data['results'].sort((b, a) => (int.parse(a['date'].toString()).compareTo(int.parse(b['date'].toString()))));

        //List messages = data['results'].getRange(0, 24);
        //print("MESSAGES:");

        print(data['results']);
        //List messages = data['results'].getRange(0,24);
        //routedData['currentMessages'] = data['results'].getRange(0,24);
        List currentMessages = [];
      for (int i = 0; i <= 24; i++)
        {
            currentMessages.add(data['results'][i]);
        }

        //routedData.put('currentMessages', currentMessages);


        Map <String, dynamic> continuedData = {};
        continuedData.addAll(routedData);
        //routedData['currentMessages'] = currentMessages;
//        routedData['currentMessages'] = currentMessages;
        //routedData['currentMessages'] = data['results'];
//      Navigator.pushReplacementNamed(context, '/inbox', arguments: {'currentMessages' : currentMessages});
      Navigator.pushReplacementNamed(context, '/inbox', arguments: {'continuedData' : continuedData, 'currentMessages' : currentMessages});

      return;
      //}
      //catch (e) {
        //print(value['msg']);
        //print(e);
        //return [];
        //return;
      //}

    }
    else
    {
      //Navigator.of(context).pop()
      print(value['msg']);

    }



  }


  Map<String, dynamic> routedData = {};

  @override
  Widget build(BuildContext context) {


    routedData = ModalRoute.of(context).settings.arguments;
    routedData['message'] = "";
    routedData['morse'] = "";
    //routedData['currentMessages'] = [];
    print(routedData);


    getData(routedData['userName']).then((value) => parseResponse(value));


    SizeConfig().init(context);
    return Scaffold(
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
                  child: Text('Loading',
                    style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: SizeConfig.blockSizeVertical *9, fontWeight: FontWeight.bold)),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(15.0, 150.0, 0.0, 0.0),
            child: Text('Inbox...',
              style: TextStyle(
                color: Colors.deepOrange,
                fontSize: SizeConfig.blockSizeVertical *9, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    ),
    ],
    ));
  }
}