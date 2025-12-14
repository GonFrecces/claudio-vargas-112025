<template>
    <div :id="`pokemon-stats-chart-${pokemonId}`" class="w-full h-64 md:h-72 lg:h-80"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';

interface Props {
    pokemonId: number
    stats: {
        hp: number
        attack: number
        defense: number
        specialAttack: number
        specialDefense: number
        speed: number
    }
}

const props = defineProps<Props>()
const chartInstance = ref<any>(null)

const initChart = () => {
    if (!props.pokemonId) return;

    const chartId = `pokemon-stats-chart-${props.pokemonId}`;
    const chartDom = document.getElementById(chartId);

    if (!chartDom) {
        console.error(`Element with id ${chartId} not found.`);
        return;
    }

    chartInstance.value = echarts.init(chartDom);

    // Hacer el gráfico responsivo
    window.addEventListener('resize', () => {
        chartInstance.value?.resize();
    });

    const option: echarts.EChartsOption = {
        radar: {
            indicator: [
                { name: `Hp - ${props.stats.hp}`, max: 255 },
                { name: `Ataque - ${props.stats.attack}`, max: 255 },
                { name: `Defensa - ${props.stats.defense}`, max: 255 },
                { name: `Atq. Especial - ${props.stats.specialAttack}`, max: 255 },
                { name: `Def. Especial - ${props.stats.specialDefense}`, max: 255 },
                { name: `Velocidad - ${props.stats.speed}`, max: 255 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {color: '#000', width: 14, height: 14, fontWeight: 'bold'},
            splitLine: {lineStyle: {color: '#ddd'}},
            splitArea: {areaStyle: {color: ['transparent', 'transparent']}},
            axisTick: {
                show: false
            }

        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [
                            props.stats.hp,
                            props.stats.attack,
                            props.stats.defense,
                            props.stats.specialAttack,
                            props.stats.specialDefense,
                            props.stats.speed
                        ],
                        name: `${props.pokemonId}`,
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                            {
                                color: 'rgb(255, 99, 132)',
                                offset: 0
                            },
                            {
                                color: 'rgba(255, 99, 132, 0.3)',
                                offset: 1
                            }
                            ]),
                        },
                        lineStyle: {
                            color: 'rgb(255, 99, 132)',
                            width: 2
                        },
                        itemStyle: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                ]
            }
        ],
    }
    
    chartInstance.value.setOption(option)

}

onMounted(() => {
    initChart();
});

</script>
