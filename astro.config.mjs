// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://maalsi-l18.github.io',
    base: '/CyberDay',
    integrations: [starlight({
        title: 'CyberDay',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/maalsi-l18/CyberDay.git' }],
        sidebar: [
            {
                label: 'CyberDay 2025',
                items: [
                    { label: 'Avancement Global', slug: 'editions/2025/avancement' },
                    {
                        label: 'Logistique & Matériel',
                        items: [
                            { label: 'Avancement', slug: 'editions/2025/logistique/avancement' },
                            { label: 'Planning', slug: 'editions/2025/logistique/planning' },
                            { label: 'Équipe', slug: 'editions/2025/logistique/equipe' },
                        ]
                    },
                    {
                        label: 'Communication & Marketing',
                        items: [
                            { label: 'Avancement', slug: 'editions/2025/communication/avancement' },
                            { label: 'Planning', slug: 'editions/2025/communication/planning' },
                            { label: 'Équipe', slug: 'editions/2025/communication/equipe' },
                        ]
                    },
                    {
                        label: 'Gestion des Sponsors',
                        items: [
                            { label: 'Avancement', slug: 'editions/2025/sponsors/avancement' },
                            { label: 'Planning', slug: 'editions/2025/sponsors/planning' },
                            { label: 'Équipe', slug: 'editions/2025/sponsors/equipe' },
                        ]
                    },
                    {
                        label: 'Programmation & Déroulement',
                        items: [
                            { label: 'Avancement', slug: 'editions/2025/programmation/avancement' },
                            { label: 'Planning', slug: 'editions/2025/programmation/planning' },
                            { label: 'Équipe', slug: 'editions/2025/programmation/equipe' },
                        ]
                    },
                    {
                        label: 'Suivi & Évaluation',
                        items: [
                            { label: 'Avancement', slug: 'editions/2025/suivi/avancement' },
                            { label: 'Planning', slug: 'editions/2025/suivi/planning' },
                            { label: 'Équipe', slug: 'editions/2025/suivi/equipe' },
                        ]
                    },
                    {
                        label: 'Stands',
                        items: [
                            { label: 'Liste des Stands', slug: 'editions/2025/stands/liste' },
                            { label: 'Stand 1', slug: 'editions/2025/stands/stand1' },
                            { label: 'Stand 2', slug: 'editions/2025/stands/stand2' },
                        ]
                    },
                    {
                        label: 'Tables Rondes',
                        items: [
                            { label: 'Liste des Tables Rondes', slug: 'editions/2025/tables-rondes/liste' },
                            { label: 'Table Ronde 1', slug: 'editions/2025/tables-rondes/table1' },
                            { label: 'Table Ronde 2', slug: 'editions/2025/tables-rondes/table2' },
                        ]
                    },
                    { label: 'Contacts', slug: 'editions/2025/contacts' },
                ],
            },
            {
                label: 'CyberDay 2026',
                items: [
                    { label: 'Avancement Global', slug: 'editions/2026/avancement' },
                    {
                        label: 'Logistique & Matériel',
                        items: [
                            { label: 'Avancement', slug: 'editions/2026/logistique/avancement' },
                        ]
                    },
                    {
                        label: 'Communication & Marketing',
                        items: [
                            { label: 'Avancement', slug: 'editions/2026/communication/avancement' },
                        ]
                    },
                    {
                        label: 'Gestion des Sponsors',
                        items: [
                            { label: 'Avancement', slug: 'editions/2026/sponsors/avancement' },
                        ]
                    },
                    {
                        label: 'Programmation & Déroulement',
                        items: [
                            { label: 'Avancement', slug: 'editions/2026/programmation/avancement' },
                        ]
                    },
                    {
                        label: 'Suivi & Évaluation',
                        items: [
                            { label: 'Avancement', slug: 'editions/2026/suivi/avancement' },
                        ]
                    },
                ],
            },
            {
                label: 'Ressources Globales',
                items: [
                    { label: 'Templates', slug: 'ressources/templates' },
                    { label: 'Checklist Organisation', slug: 'ressources/checklist' },
                    { label: 'Exemple PDF', slug: 'ressources/pdf-example' },
                ],
            },
        ],
		}), react()],
});