import Vue from 'vue';

import BButton from '@/components/BButton';
import BInput from '@/components/BInput';
import BPic from '@/components/BPic';
import BPopup from '@/components/BPopup';
import BRating from '@/components/BRating';

const components = {
    BButton,
    BInput,
    BPic,
    BPopup,
    BRating,
};

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
});
