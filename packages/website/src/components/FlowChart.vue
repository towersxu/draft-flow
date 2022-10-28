<script lang="ts">
import { ref } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import LfRough from 'lf-rough'
console.log(LfRough)

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
      // width: 1200,
      // height: 600,
      grid: false,
      // keyboard: true,
      plugins: [
        LfRough
      ]
    })
    lf.render(
      {
        nodes: [
          {
            type: 'rough-rect',
            x: 100,
            y: 100,
          },
          {
            type: 'rough-rect',
            x: 300,
            y: 100,
            properties: {
              roughOption: {
                fillStyle: "zigzag"
              }
            }
          },
          {
            type: 'rough-rect',
            x: 500,
            y: 100,
            properties: {
              roughOption: {
                fillStyle: "cross-hatch"
              }
            }
          },
          {
            type: 'rough-polygon',
            x: 500,
            y: 300,
            properties: {
              roughOption: {
                fillStyle: "cross-hatch"
              }
            }
          },
          {
            type: 'rough-polygon',
            x: 300,
            y: 300,
            properties: {
              roughOption: {
                fillStyle: "zigzag"
              }
            }
          },
          {
            type: 'rough-polygon',
            x: 100,
            y: 300,
          },
          {
            type: 'rough-star',
            x: 100,
            y: 500,
            properties: {
              roughOption: {
                bowing: "6",
                strokeWidth: 1,
                stroke: 'green',
                fillStyle: "solid"
              }
            }
          }
        ]
      }
    )
  },
  methods: {
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
