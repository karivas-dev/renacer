<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue"
import gsap from "gsap"

import { Menu, X } from "lucide-vue-next"
import { twMerge } from "tailwind-merge"

import Logo from "@assets/home/Logo-Renacer-SF.png"

interface Props {
  class?: string
}

const props = defineProps<Props>()

const isOpen = ref(false)

const currentPath = ref("/")

const mobileMenu = ref<HTMLElement | null>(null)
const mobileLinks = ref<HTMLElement[]>([])

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/creando-esperanza", label: "Creando Esperanza" },
  { href: "/involucrate", label: "Involúcrate" },
  { href: "/unete", label: "Únete" }
]

onMounted(() => {
  currentPath.value = window.location.pathname
})

const headerClass = twMerge(
    "max-w-full rounded-lg bg-white px-6 py-4 shadow-xl",
    props.class
)

function isActive(path: string) {
  if (path === "/") {
    return currentPath.value === "/"
  }

  return currentPath.value.startsWith(path)
}

async function toggleMenu() {
  isOpen.value = !isOpen.value

  await nextTick()

  if (isOpen.value) {
    gsap.fromTo(
        mobileMenu.value,
        {
          height: 0,
          opacity: 0
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out"
        }
    )

    gsap.fromTo(
        mobileLinks.value,
        {
          y: -10,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.25,
          delay: 0.1,
          ease: "power2.out"
        }
    )
  } else {
    gsap.to(mobileMenu.value, {
      height: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.inOut"
    })
  }
}
</script>

<template>
  <header :class="headerClass">
    <div class="flex items-center justify-between">
      <a href="/" class="shrink-0">
        <img
            :src="Logo.src"
            alt="Fundación Renacer logo"
            width="125"
            class="h-auto"
        />
      </a>

      <nav class="hidden items-center space-x-6 md:flex">
        <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            :class="
            twMerge(
              'transition-all duration-200 hover:opacity-70',
              isActive(link.href)
                && 'font-bold text-r-green'
            )
          "
        >
          {{ link.label }}
        </a>
      </nav>

      <button
          type="button"
          class="md:hidden"
          aria-label="Toggle menu"
          :aria-expanded="isOpen"
          @click="toggleMenu"
      >
        <Menu v-if="!isOpen" :size="28" />
        <X v-else :size="28" />
      </button>
    </div>

    <div
        v-show="isOpen"
        ref="mobileMenu"
        class="overflow-hidden md:hidden"
    >
      <nav class="mt-4 flex flex-col space-y-4 border-t pt-4">
        <a
            v-for="(link, index) in navLinks"
            :key="link.href"
            :ref="el => mobileLinks[index] = el as HTMLElement"
            :href="link.href"
            :class="
            twMerge(
              'transition-all duration-200 hover:opacity-70',
              isActive(link.href)
                && 'font-semibold text-green-700'
            )
          "
            @click="toggleMenu"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>