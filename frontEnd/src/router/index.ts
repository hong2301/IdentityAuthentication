import { createRouter, createWebHashHistory } from 'vue-router'
import BackHomeView from '../views/backHome.vue'
import HomeView from '../views/home.vue'
import Layout from '../components/layout.vue'
import PhyexamView from '../views/phyexam.vue'
import BusinessView from '../views/business.vue'
import PasswordView from '../views/password.vue'
import PrinterView from '../views/printer.vue'
import CameraView from '../views/camera.vue'
import OperatingTimeView from '../views/operatingTime.vue'
import OperationProcessView from '../views/operationProcess.vue'
import HardwareView from '../views/hardware.vue'
import ShoesView from '../views/shoes.vue'
import CertificateView from '../views/certificate.vue'
import PhotographnView from '../views/photographn.vue'
import NetworkView from '../views/network.vue'
import SnapvView from '../views/snapv.vue'
import CarTypeView from '../views/carType.vue'
import ExamView from '../views/process/exam.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/layout',
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
      ]
    },
    {
      path: '/',
      redirect: '/layout'
    }
  ]
})

export default router
