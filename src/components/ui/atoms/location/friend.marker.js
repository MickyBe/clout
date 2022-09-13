import React, {useRef} from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  AnnouncementImageCallout,
  AnnouncementCallout,
  AnnouncementAudioCallout,
} from "../map/announcement-callout";
import Popover from "react-native-popover-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isNil } from "lodash";

export default function FriendMarker({
  annoucementData,
  selected,
  color,
  disconnected,
  name,
  width,
  data,
  handleClosePopover,
  touchable,
}) {
  const insets = useSafeAreaInsets();

  const filteredData = annoucementData.filter((item) => item.id === data.id).pop();

  console.log("ANNOUNCEMENT DATA >>>>>> ", filteredData?.audio && filteredData?.image === null);
  
  return (
    <ScrollView>
      <View key={data.id}>
        {filteredData?.id ? <Popover
          popoverStyle={{ backgroundColor: "transparent" }}
          arrowStyle={{ backgroundColor: "red" }}
          backgroundStyle={{ backgroundColor: "transparent" }}
          displayAreaInsets={insets}
          from={touchable}
          isVisible={selected.id === data.id}
          onRequestClose={() => handleClosePopover()}
        >
          {!filteredData?.image && !filteredData?.audio ? (
            <AnnouncementCallout data={filteredData} width={width} />
          ) : filteredData?.audio && filteredData?.image === undefined ? <AnnouncementAudioCallout data={filteredData} width={width} /> : (
            <AnnouncementImageCallout data={filteredData} width={width} />
          )}
        </Popover> : <></>}
        

        <View
          style={{
            height: 22,
            width: 22,
            borderRadius: 22 / 2,
            backgroundColor: color,
            opacity: disconnected ? 0.5 : 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Text style={{ color: "white" }}> {name? name[0].toUpperCase(): ""} </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2ffd2",
  },
  content: {
    padding: 16,
    backgroundColor: "pink",
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: "pink",
  },
  background: {
    backgroundColor: "rgba(0, 0, 255, 0.5)",
  },
});
