import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import opportunitiesApi from "../apis/opportunities";

import OpportunityCard from "../components/OpportunityCard";
import useAuth from "../auth/useAuth";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function OppotunitiesScreen() {
  const [opportunities, setOpportunities] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();
  const focus = useIsFocused();

  const [filter, setfilter] = useState("");
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOpportunities = async () => {
    const res = await opportunitiesApi.getOpportunities();
    return res.data.data;
  };
  const oncardClick = (ind) => {
    let temp = opportunities;
    temp[ind].isSaved = !temp[ind].isSaved;
    setOpportunities([...temp]);
  };
  useEffect(() => {
   if(focus){
    setLoading(true);
    getOpportunities().then((data) => {
      console.log("oppur dt ", data);
      setOpportunities(data);
      setAll(data);
      setLoading(false);
    });
   }
    // const res =  opportunitiesApi.getOpportunities().then((res)=>{
    //   setOpportunities(res.data.data);

    // });
    // console.log("Data ",res.data.data)
  }, [focus]);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getOpportunities().then((data) => {
      setOpportunities(data);
    });
    setRefresh(false);
  }, []);
  if (loading) {
    return <ActivityIndicator size={25} color="black" />;
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
          >
        <Feather
          name="search"
          size={24}
          color="black"
        />
        <TextInput
        style={{
          height: 30,
          paddingHorizontal:10,
          borderBottomWidth:1
        }}
          value={filter}
          placeholder="Search By Location/Job Type/Company..."
          onChangeText={(val) => {
            let filterlist = [];
            let fliter = val.toLowerCase();
            setfilter(val);
            // if (val === "" || !val) {
            //   setOpportunities([...all]);
            //   return;
            // }
            // all.map((o) => {
            //   console.log("ooooo ",o)
            //   if (JSON.stringify(o.location).toLowerCase().includes(fliter)) {
            //     filterlist.push(o);
            //   }
            //   if (o.company.toLowerCase().includes(fliter)) {
            //     filterlist.push(o);
            //   }
            //   if (o.job_title.toLowerCase().includes(fliter)) {
            //     filterlist.push(o);
            //   }
            //   if (o.type?.toLowerCase().includes(fliter)) {
            //     filterlist.push(o);
            //   }
            // });
            // console.log("val ", fliter, filterlist, val === "", !val, val);

            // setOpportunities([...filterlist]);
          }}
        />
      </View>
      {opportunities.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={opportunities.filter((o) =>

            (JSON.stringify(o.location).toLowerCase().includes(filter.toLowerCase()) ||o.company.toLowerCase().includes(filter.toLowerCase())||o.job_title.toLowerCase().includes(filter.toLowerCase()) || o.type?.toLowerCase().includes(filter.toLowerCase()))
            
          )}
          renderItem={({ item, index }) => (
            <OpportunityCard
              {...item}
              user={user}
              oncardClick={oncardClick}
              index={index}
            />
          )}
          keyExtractor={(item) => item.index}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text>No data found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 10,
  },
});
