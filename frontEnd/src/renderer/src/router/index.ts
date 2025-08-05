import { createRouter, createWebHashHistory } from 'vue-router'
import BackHomeView from '../views/back/backHome.vue'
import HomeView from '../views/home.vue'
import Layout from '../components/layout.vue'
import PhyexamView from '../views/back/phyexam.vue'
import BusinessView from '../views/back/business.vue'
import PasswordView from '../views/back/password.vue'
import PrinterView from '../views/back/printer.vue'
import CameraView from '../views/back/camera.vue'
import OperatingTimeView from '../views/back/operatingTime.vue'
import OperationProcessView from '../views/back/operationProcess.vue'
import HardwareView from '../views/back/hardware.vue'
import ShoesView from '../views/back/shoes.vue'
import CertificateView from '../views/back/certificate.vue'
import PhotographnView from '../views/back/photographn.vue'
import NetworkView from '../views/back/network.vue'
import SnapvView from '../views/back/snapv.vue'
import CarTypeView from '../views/back/carType.vue'
import ExamView from '../views/exam.vue'
import SnapView from '../views/snap.vue'
import GetId from '@/views/process/getId.vue'
import GetIphoneView from '@/views/process/getIphone.vue'
import VehicleModelView from '@/views/process/vehicleModel.vue'
import ConfurmView from '@/views/process/confurm.vue'
import SnapProView from '@/views/process/snap.vue'
import FingerDetectionView from '@/views/process/fingerDetection.vue'
import NeckView from '@/views/process/neck.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: '首页',
          component: HomeView
        },
        {
          path: 'back',
          name: '后台设置',
          component: BackHomeView,
        },
        {
          path: 'back/phyexam',
          name: '体检设置',
          component: PhyexamView
        },
        {
          path: 'back/business',
          name: '业务记录',
          component: BusinessView
        },
        {
          path: 'back/password',
          name: '修改密码',
          component: PasswordView
        },
        {
          path: 'back/printer',
          name: '打印机设置',
          component: PrinterView
        },
        {
          path: 'back/camera',
          name: '摄像头设置',
          component: CameraView
        },
        {
          path: 'back/operatingTime',
          name: '操作时间',
          component: OperatingTimeView
        },
        {
          path: 'back/operationProcess',
          name: '操作流程',
          component: OperationProcessView
        },
        {
          path: 'back/hardware',
          name: '硬件测试',
          component: HardwareView
        },
        {
          path: 'back/shoes',
          name: '脱鞋设置',
          component: ShoesView
        },
        {
          path: 'back/certificate',
          name: '证件设置',
          component: CertificateView
        },
        {
          path: 'back/photographn',
          name: '相机设置',
          component: PhotographnView
        },
        {
          path: 'back/network',
          name: '网络支付',
          component: NetworkView
        },
        {
          path: 'back/snapv',
          name: '拍照设置',
          component: SnapvView
        },
        {
          path: 'back/carType',
          name: '准驾车型设置',
          component: CarTypeView
        },
        {
          path: 'exam',
          name: '体检',
          component: ExamView
        },
        {
          path: 'snap',
          name: '拍照',
          component: SnapView
        },
        {
          path: 'process/getId',
          name: '身份证信息获取',
          component: GetId
        },
        {
          path: 'process/getIphone',
          name: '手机号码获取',
          component: GetIphoneView
        },
        {
          path: 'process/vehicleModel',
          name: '准驾车型选择',
          component: VehicleModelView
        },
        {
          path: 'process/confurm',
          name: '信息确认',
          component: ConfurmView
        },
        {
          path: 'process/snapPro',
          name: '拍照',
          component: SnapProView
        },
        {
          path: 'process/fingerDetection',
          name: '手指检测',
          component: FingerDetectionView
        },
        {
          path: 'process/neck',
          name: '颈部检测',
          component: NeckView
        }

      ]
    },
  ]
})

export default router
