<script lang="ts">
import { ref } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import LfRough from 'lf-rough'
import data from './data'

export default {
  setup() {
    const count = ref(0)
    const currentNode = ref(null)
    return {
      count,
      currentNode
    }
  },
  mounted() {
    const lf = new LogicFlow({
      container: this.$refs.container,
      grid: false,
      nodeTextEdit: false,
      keyboard: {
        enabled: true
      },
      multipleSelectKey: 'alt',
      plugins: [
        LfRough
      ]
    })
    lf.setTheme({
      text: {
        fontSize: 50,
        fill: '#000'
      },
    })
    lf.render(data)
    this.lf =lf
  },
  methods: {
    getData () {
      const data = this.lf.getGraphData()
      console.log(JSON.stringify(data))
    }
  },
  components: {
  }
}
</script>

<template>
  <div class="flow-chart">
    <div ref="container" class="container"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.flow-chart {
  position: relative;
  /* width: 1200px; */
  /* margin: 0 auto; */
  width: 100%;
  height: 100%;
}
.flow-chart :deep(.lf-graph) {
  background: rgb(247, 247, 247);
}

</style>
