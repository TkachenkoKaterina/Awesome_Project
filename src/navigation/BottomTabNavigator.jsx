import React from "react";
import { View, } from "react-native";
import {
    StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigationState } from '@react-navigation/native';

import PostsScreen from "../Screens/PostsScreen.jsx";
import CreatePostsScreen from "../Screens/CreatePostsScreen.jsx";
import ProfileScreen from "../Screens/ProfileScreen.jsx";

import LogoutBtn from "../components/LogoutBtn.jsx";
import PostsBtn from "../components/PostsBtn.jsx";
import CreatePostsBtn from "../components/CreatePostsBtn.jsx";
import ProfileBtn from "../components/ProfileBtn.jsx";
import CommentsScreen from '../Screens/CommentsScreen.jsx';
import MapScreen from '../Screens/MapScreen.jsx';
import BackBtn from "../components/BackBtn.jsx";

import ArrowLeftIcon from "../icons/ArrowLeftIcon.jsx";

const Tabs = createBottomTabNavigator();

export default BottomTabNavigator = () => {
    const state = useNavigationState((navState) => {
        const tabState =
          navState?.routes.find((route) => route.name === 'BottomTabNavigator')
            ?.state || navState;
        return tabState;
    });
    
    const isCreatePostsScreen = state?.routes[state.index]?.name === 'CreatePosts';

    return (
        <Tabs.Navigator
            initialRouteName="Posts"
            screenOptions={{
                headerTitleAlign: "center",
                headerRightContainerStyle: { paddingRight: 16 },
                tabBarShowLabel: false,
            }}>
            <Tabs.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerStatusBarHeight: 44,
                    headerRight: () => <LogoutBtn />,
                    tabBarIcon: ({ focused }) => {
                        return focused ?
                            <View style={styles.tabBarItem}>
                                <PostsBtn color="#FFFFFF" fill="#FF6C00" />  
                            </View>
                        :
                            <PostsBtn color="#4D4D4D" />
                    },
                }}
            />
            {isCreatePostsScreen ? (
                <Tabs.Screen
                    name="CreatePosts"
                    component={CreatePostsScreen}
                    options={{
                        title: "Створити публікацію",
                        headerStatusBarHeight: 44,
                        headerLeftContainerStyle: {
                            paddingLeft: 16,
                        },
                        headerLeft: () => (
                            <BackBtn />
                        ),
                        tabBarStyle: { display: "none" },
                        tabBarItemStyle: { display: "none" }
                    }}
                />
                ) : (
                <Tabs.Screen
                    name="CreatePosts"
                    component={CreatePostsScreen}
                    options={{
                        title: "Створити публікацію",
                        headerStatusBarHeight: 44,
                        headerLeftContainerStyle: {
                            paddingLeft: 16,
                        },
                        headerLeft: () => (
                            <BackBtn />
                        ),
                        tabBarIcon: () => <CreatePostsBtn color="#4D4D4D" />
                    }}
                />)
            }
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={() => ({
                    headerShown: false,
                    headerRight: () => <ArrowLeftIcon />,
                    tabBarIcon: ({ focused }) => {
                        return focused ?
                            <View style={styles.tabBarItem}>
                                <ProfileBtn color="#FFFFFF" />
                            </View>
                        :
                            <View style={[styles.tabBarItem,
                                {
                                    backgroundColor: "transparent",
                                }
                            ]}>
                                <ProfileBtn />
                            </View>
                    },
                })}
            />
            <Tabs.Screen
                name="Comments"
                component={CommentsScreen}
                options={{
                    title: "Коментарі",
                    headerStatusBarHeight: 44,
                    headerLeftContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerLeft: () => (
                        <BackBtn />
                    ),
                    tabBarStyle: { display: "none" },
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Map"
                component={MapScreen}
                options={{
                    title: "Локація",
                    headerStatusBarHeight: 44,
                    headerLeftContainerStyle: {
                        paddingLeft: 16,
                    },
                    headerLeft: () => (
                        <BackBtn />
                    ),
                    tabBarStyle: { display: "none" },
                    tabBarItemStyle: { display: "none" }
                }}
            />
        </Tabs.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FF6C00",
    }
});