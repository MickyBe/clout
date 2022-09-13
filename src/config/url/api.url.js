// export const baseUrl = "http://192.168.1.9:3000";http://ec2-3-138-123-246.us-east-2.compute.amazonaws.com
// export const baseUrl = "http://192.168.0.169:3000";
// export const socketUrl = "http://192.168.0.169:3000";
export const baseUrl = "http://192.168.0.169:3000";//http://ec2-3-142-252-77.us-east-2.compute.amazonaws.com:3000
export const socketUrl = "http://192.168.0.169:3000";

export const userUrl = `${baseUrl}/users`;
export const userDataUrl = `${baseUrl}/users/data?type=user`;
export const userDataGroupUrl = `${baseUrl}/users/data?type=group`;
export const allUserUrl = `${baseUrl}/users/suggestion`;
export const searchUserUrl = `${baseUrl}/users/search?key=`;
export const processRequestUrl = `${baseUrl}/users/process-request?type=`;
export const userRequest = `${baseUrl}/users/request`;
export const userProfileUrl = `${baseUrl}/users/profile`;

export const addGroup = `${baseUrl}/groups`;

export const addAnnouncementUrl = `${baseUrl}/announcement`;
export const getAnnouncementUrl = `${baseUrl}/announcement/user`;