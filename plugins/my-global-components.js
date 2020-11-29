import Vue from 'vue';

import BPopup from '@/components/BPopup';
import BInput from '@/components/BInput';
import BButton from '@/components/BButton';
import BRating from '@/components/BRating';

const components = {
    BPopup,
    BInput,
    BButton,
    BRating,
};

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
});
