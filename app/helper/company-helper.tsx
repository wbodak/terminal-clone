import MyDataGrid from "@/components/DataGrid/MyDataGrid";
import MyDropdown from "@/components/Elements/MyDropdown";
import Header from "@/components/Header";
import { useAxios } from "@/hooks/useAxiox";
import useStore from "@/store/useStore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const CompanyHelper = () => {
  const router = useRouter();
  const { axiosGet } = useAxios();

  const setPageData = useStore((state) => state.setPageData);

  const [companies, setCompanies] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);
  const [companyParams, setCompanyParams] = useState({
    typeId: 4,
    state: true,
  });

  const companyParamsData = [
    { value: true, text: "Aktif Firmalar" },
    { value: false, text: "Pasif Firmalar" },
  ];

  const companyParamsOnChange = (value: any, key: string) => {
    const newConpanyParams = { ...companyParams, [key]: value };
    setCompanyParams(newConpanyParams);
    getData(newConpanyParams);
  };

  const getData = (params = companyParams) => {
    axiosGet({
      path: `/Common/GetCompanyHelper/?typeId=${params.typeId}&state=${params.state}`,
      success: (data) => {
        setCompanies(data);
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    axiosGet({
      path: "/System/GetGroupMasterList?type=Firma",
      noLoading: true,
      success: (data) => {
        const sbData = data.map((item: any) => {
          return {
            text: item.GROUPMASTER_NAME,
            value: item.ID,
          };
        });
        setCompanyTypes(sbData);
      },
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#16171A", height: "100%", width: "100%" }}>
      <Header title={"Firma Seçimi"} backButtonEnable />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: 10,
          paddingHorizontal: 16,
        }}
      >
        <MyDropdown
          placeholder="Firma Durumu"
          label="Firma Durumu"
          value={companyParams.state}
          containerStyle={{ flex: 1 }}
          setValue={(x) => {
            companyParamsOnChange(x, "state");
          }}
          data={companyParamsData}
        />
        <MyDropdown
          placeholder="Firma Türü"
          label="Firma Türü"
          value={companyParams.typeId}
          containerStyle={{ flex: 1 }}
          setValue={(x) => {
            companyParamsOnChange(x, "typeId");
          }}
          data={companyTypes}
        />
      </View>

      <MyDataGrid
        containerStyle={{ flex: 1, marginVertical: 10, paddingHorizontal: 16 }}
        gridStyle={{ maxHeight: "100%", flex: 1, marginVertical: 10 }}
        columns={[
          { dataField: "COMPANY_CODE", caption: "Firma No" },
          { dataField: "COMPANY_NAME", caption: "Firma Adı" },
          { dataField: "COMPANY_TAXNO", caption: "V.D. No" },
        ]}
        data={companies}
        onSelect={(selectedRowsData: any) => {
          setPageData("purchaseReturn", selectedRowsData);
          router.back();
        }}
        searchedField={"COMPANY_NAME"}
      />
    </View>
  );
};

export default CompanyHelper;
