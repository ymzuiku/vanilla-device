import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Home } from "./pages/Home";
import vanillaDevice from "vanilla-device";

vanillaDevice.setCanScrollByAttribute();
vanillaDevice.setKeyboardAutoHide();

render(<Home />, document.getElementById("root"));
