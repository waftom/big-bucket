import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "h1": {
        "fontWeight": "bold"
    },
    "h2": {
        "fontWeight": "bold"
    },
    "h3": {
        "fontWeight": "bold"
    },
    "img": {
        "marginTop": -15,
        "marginLeft": -15,
        "width": 130
    },
    "navbar": {
        "borderBottom": "1px solid #ccc !important"
    },
    "table": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": "!important",
        "marginLeft": "auto"
    },
    "table img": {
        "paddingTop": 15,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "table thead tr th": {
        "fontSize": 20
    },
    "table tbody tr td": {
        "verticalAlign": "middle !important"
    },
    "input[type=\"checkbox\"]": {
        "width": 25,
        "height": 25
    },
    "buy": {
        "float": "right",
        "fontSize": 16,
        "fontWeight": "bold",
        "paddingTop": 5,
        "paddingRight": 30,
        "paddingBottom": 5,
        "paddingLeft": 30,
        "marginTop": 30,
        "marginRight": 0,
        "marginBottom": 30,
        "marginLeft": 0
    },
    "restore": {
        "float": "left",
        "fontSize": 16,
        "fontWeight": "bold",
        "paddingTop": 5,
        "paddingRight": 30,
        "paddingBottom": 5,
        "paddingLeft": 30,
        "marginTop": 30,
        "marginRight": 0,
        "marginBottom": 30,
        "marginLeft": 0,
        "backgroundColor": "#868e96",
        "color": "#fff"
    },
    "bold": {
        "fontWeight": "bold"
    },
    "err_msg": {
        "display": "none",
        "position": "fixed",
        "top": "30%",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "fontSize": 20,
        "fontWeight": "bold",
        "left": "50%",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "border": "3px solid #ccc",
        "backgroundColor": "#f6f6f6",
        "borderRadius": 10,
        "boxShadow": "8px 8px 15px #777"
    },
    "err_msg button": {
        "float": "right"
    },
    "selected_imgs": {
        "float": "left",
        "paddingRight": 15,
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 50,
        "marginLeft": 0
    },
    "selected_imgs img": {
        "width": 250,
        "marginTop": 0,
        "marginLeft": 0
    }
});