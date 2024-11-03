import { NavigationState, Route, SceneRendererProps } from 'react-native-tab-view';

export interface TabRoute extends Route {
  key: string;
  title: string;
}

export interface TabViewProps extends SceneRendererProps {
  navigationState: NavigationState<TabRoute>;
  position: any;
}
