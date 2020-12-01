import DotEnv from 'dotenv'
DotEnv.config({ path: '.env.test' })

// enzymeの設定file
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({
  adapter: new Adapter(),
})
