import { defineConfig } from 'vite'
import viteConfig from './vite.config'


// https://vitejs.dev/config/
export default defineConfig((command) => {

    return {
        ...viteConfig,
        build: {
            minify: command.mode == "development" ? false : true,
        }
    }


})
