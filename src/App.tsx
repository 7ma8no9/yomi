import "./App.scss";
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'jotai'
import 'react-toastify/dist/ReactToastify.css';

import useThemeDetect from "@hooks/use-theme-detect.ts";
import {globalStore} from "@stores/global.ts";
import Router from '@router'
import ToastProvider from "@components/ToastProvider";

function App() {
  useThemeDetect()

  return (
    <Provider store={globalStore}>
      <NextUIProvider>
        <Router />
        <ToastProvider />
      </NextUIProvider>
    </Provider>
  );
}

export default App;
