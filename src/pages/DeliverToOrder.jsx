import '../styles/global.css'
import ArtworksSlider from '../components/ArtworksSlider'
import CelebrationSlider from '../components/CelebrationSlider'
import PackagingSlider from '../components/PackagingSlider'
import DispatchSlider from '../components/DispatchSlider'
import OutForDeliverySlider from '../components/OutForDeliverySlider'
import DeliveredSlider from '../components/DeliveredSlider'

function DeliverToOrder() {
  return (
    <main >
      <ArtworksSlider />
      <CelebrationSlider />
      <PackagingSlider />
      <DispatchSlider />
      <OutForDeliverySlider />
      <DeliveredSlider />
    </main>
  )
}

export default DeliverToOrder
