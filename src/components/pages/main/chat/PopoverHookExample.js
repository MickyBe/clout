import React, { useState } from "react";
import { Text, View } from "react-native";
import { Popover, usePopover } from "react-native-modal-popover";
import Button from "./Button";

export const PopoverHookExample = (props) => {
  const [show, setShow] = useState(false);
  const { width, height, icon, text, alignItems, justifyContent } = props;
  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover();

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Button icon={icon} ref={touchableRef} onPress={() => setShow(true)} />
      <Popover
        visible={show}
        onClose={() => setShow(!show)}
        fromRect={popoverAnchorRect}
        supportedOrientations={["portrait", "landscape"]}
      >
        <Text>AAAAAAAAAAAAAAAAAAAAAA</Text>
      </Popover>
    </View>
  );
};
