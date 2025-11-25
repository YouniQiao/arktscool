# 搭建真机运行环境

如果您有运行HarmonyOS 5及以上版本的手机、平板等真机设备，您可以采用USB连接方式或无线连接的方式使用真机调试应用。

## 使用USB连接方式

1.  使用USB方式，将真机设备与PC端进行连接。
2.  在**设置 > 系统 > 开发者选项**中，打开“**USB调试**”开关（确保设备已连接USB）。
3.  在真机设备中会弹出“允许USB调试”的弹框，单击**允许**。
    
    ![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170933.65258480374872169895474210809191:50001231000000:2800:D1398FC1741064EF1DD734CB57ECF03850D6F21A6603C43FBEF4D8D606D82967.png)
    
4.  在菜单栏中，单击**Run>Run'模块名称'**或![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170933.95144082319417127616229427165956:50001231000000:2800:BEB92B3897BB34119EDE25E330F08A4B625A7D9CF888B085330C0FA32310FD6D.png)，或使用默认快捷键**Shift+F10**（macOS为**Control+R**）运行应用。
    
    ![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.87037680702965524049006895591023:50001231000000:2800:D3CA3B03AF5F0D5446442065FC93255AC29E4B7DA5887BB55CF3BECA8CD84FDC.png)
    
5.  DevEco Studio启动HAP的编译构建和安装。安装成功后，设备会自动运行安装的HarmonyOS应用。

## 使用无线连接方式

1.  将真机设备和PC连接到同一WLAN网络。
2.  在**设置 > 系统 >** **开发者选项**中，打开“**无线调试**”或“**通过WLAN调试**”（Wearable设备）开关，并获取设备端的IP地址和端口号。
    
    ![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.26967266418114318371548344534933:50001231000000:2800:1ABC8126896AE86CF27FA3D1EBA72CDCED09C7D6292AA250BF1C37B638C7411C.png "点击放大")
    
3.  在DevEco Studio菜单栏中，单击**Tools > IP Connection**，输入连接设备的IP地址和端口号，单击![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.61299400532603620606185250945931:50001231000000:2800:F759A2AFC5FA34B787566626EEEF9FE74B56EE6F911CFC23E9E4F30E85ED66E0.png)，连接正常后，设备状态为**online**。
        
    ![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.08798986441606000730597712217392:50001231000000:2800:41E2A068939BBD86A3BDF00A73DEE802A7F548EF9D2A91AD1AD1D15849FE6A94.png)
        
4.  在菜单栏中，单击**Run>Run'模块名称'**或![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.49404155816139983246697260091250:50001231000000:2800:BFD01D7183776F01DC17C731D7B960733304C859B4BE8CA4CEE522B0B76FC97B.png)，或使用默认快捷键**Shift+F10**（macOS为**Control+R**）运行应用。
    
    ![](https://alliance-communityfile-drcn.dbankcdn.com/FileServer/getFile/cmtyPub/011/111/111/0000000000011111111.20251120170934.25143238495853841080961312063121:50001231000000:2800:4B4DDC0541325E6DC82426C27B8C600CDB4AC79C253DE226F1D2AE34995CAF04.png)
    
5.  DevEco Studio启动HAP的编译构建和安装。安装成功后，设备会自动运行安装的HarmonyOS应用。