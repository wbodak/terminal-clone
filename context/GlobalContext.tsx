// ** React Imports
import { createContext, ReactNode, useRef, useState } from "react";
import Loading from "@/components/Loading";
import SnackeBar, { CustomAlertProps } from "@/components/SnackeBar/SnackeBar";
import MyDialog, { DialogProps } from "@/components/Dialog";

type GlobalValuesType = {
  stopLoader: () => any;
  startLoader: () => any;
  showSnackeBar: ({ dialogName, message }: CustomAlertProps) => void;
  showDialog: (dialog: DialogProps) => any;
  selectedRow: any;
  setSelectedRow: (value: any) => void;
};

// ** Defaults
const defaultProvider: GlobalValuesType = {
  stopLoader: () => null,
  startLoader: () => null,
  showSnackeBar: () => null,
  showDialog: () => null,
  selectedRow: null,
  setSelectedRow: () => null,
};

const GlobalContext = createContext<GlobalValuesType>(defaultProvider);

type Props = {
  children: ReactNode;
};

const GlobalProvider = ({ children }: Props) => {
  const loadingRef = useRef() as any;
  const snackbarRef = useRef() as any;
  const dialogRef = useRef() as any;

  const [selectedRow, setSelectedRow] = useState<any>(null);

  const startLoader = () => loadingRef?.current?.start();
  const stopLoader = () => loadingRef?.current?.stop();
  const showSnackeBar = (props: CustomAlertProps) =>
    snackbarRef?.current?.showSnackeBar(props);
  const showDialog = (dialog: DialogProps) => dialogRef?.current?.show(dialog);

  const values = {
    startLoader,
    stopLoader,
    showSnackeBar,
    showDialog,
    selectedRow,
    setSelectedRow,
  };

  return (
    <GlobalContext.Provider value={values}>
      {children}
      <Loading ref={loadingRef} />
      <SnackeBar ref={snackbarRef} />
      <MyDialog ref={dialogRef} />
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
