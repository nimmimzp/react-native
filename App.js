import {Navigation} from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawerScreen from "./src/screens/SideDrawer/SideDrawer";
import configureStore from './src/store/configureStore';
//Register Screen
const store = configureStore();
Navigation.registerComponent("awsome-place.AuthScreen", 
	() => AuthScreen,
	store,
	Provider
);
Navigation.registerComponent("awesome-places.SharePlaceScreen",
	() => SharePlaceScreen,
	store,
	Provider
);
Navigation.registerComponent("awsome-places.FindPlaceScreen",
	() => FindPlaceScreen,
	store,
	Provider
);

Navigation.registerComponent("awesome-places.PlaceDetailScreen",
	() => PlaceDetailScreen,
	store,
	Provider

);

Navigation.registerComponent("awsome-place.SideDrawerScreen",
	() => SideDrawerScreen
);

//Start a App

Navigation.startSingleScreenApp({
	screen:{
		screen:"awsome-place.AuthScreen",
		title:"Login"
	}
});

