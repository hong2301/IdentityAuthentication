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
          name: 'home',
          component: HomeView
        },
        {
          path: 'back',
          name: 'backHome',
          component: BackHomeView,
        },
        {
          path: 'back/phyexam',
          name: 'phyexam',
          component: PhyexamView
        },
        {
          path: 'back/business',
          name: 'business',
          component: BusinessView
        },
        {
          path: 'back/password',
          name: 'password',
          component: PasswordView
        },
        {
          path: 'back/printer',
          name: 'printer',
          component: PrinterView
        },
        {
          path: 'back/camera',
          name: 'camera',
          component: CameraView
        },
        {
          path: 'back/operatingTime',
          name: 'operatingTime',
          component: OperatingTimeView
        },
        {
          path: 'back/operationProcess',
          name: 'operationProcess',
          component: OperationProcessView
        },
        {
          path: 'back/hardware',
          name: 'hardware',
          component: HardwareView
        },
        {
          path: 'back/shoes',
          name: 'shoes',
          component: ShoesView
        },
        {
          path: 'back/certificate',
          name: 'certificate',
          component: CertificateView
        },
        {
          path: 'back/photographn',
          name: 'photographn',
          component: PhotographnView
        },
        {
          path: 'back/network',
          name: 'network',
          component: NetworkView
        },
        {
          path: 'back/snapv',
          name: 'snapv',
          component: SnapvView
        },
        {
          path: 'back/carType',
          name: 'carType',
          component: CarTypeView
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
