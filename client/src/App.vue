<template>
    <div id="app">
        <h1 class="title">Bucket List:</h1>
        <div class="field has-addons">
            <input
                type="text"
                placeholder="Description..."
                v-model="description"
                class="is-expanded control input"
            />
            <button
                class="button is-info control"
                @click="addItem"
                :disabled="!description"
            >
                Add
            </button>
        </div>
        <br />
        <div class="notification" v-for="(item, idx) in items" :key="item._id">
            <div class="columns">
                <input
                    v-if="isSelected(item._id)"
                    type="text"
                    v-model="editDescription"
                    class="column input"
                />
                <p v-else class="column">
                    <span class="tag is-primary">{{ idx + 1 }}</span>
                    {{ item.description }}
                </p>

                <div class="column is-narrow">
                    <span
                        v-if="isSelected(item._id)"
                        @click="unselect()"
                        class="icon has-primary-text"
                    >
                        <i class="material-icons">close</i>
                    </span>
                    <span
                        v-else
                        @click="select(item, idx)"
                        class="icon has-primary-text"
                    >
                        <i class="material-icons">edit</i>
                    </span>

                    <span
                        v-if="isSelected(item._id)"
                        @click="editItem(idx)"
                        class="icon has-primary-text"
                    >
                        <i class="material-icons">edit</i>
                    </span>
                    <span
                        v-else
                        @click="removeItem(item, idx)"
                        class="icon has-primary-text"
                    >
                        <i class="material-icons">delete</i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'App',
    data() {
        return {
            items: [],
            description: '',
            selected_id: '',
            editDescription: '',
        }
    },
    async mounted() {
        try {
            const res = await axios.get('/api/bucketListItems/')
            this.items = res.data
        } catch (e) {
            console.log('Mounted error!', e)
        }
    },
    methods: {
        async addItem() {
            try {
                const res = await axios.post('/api/bucketListItems/', {
                    description: this.description,
                })
                this.items.push(res.data)
            } catch (e) {
                console.log('Post error!', e)
            }
        },
        async removeItem(item, idx) {
            try {
                await axios.delete(`/api/bucketListItems/${item._id}`)
                this.items.splice(idx, 1)
            } catch (e) {
                console.log('Delete error!', e)
            }
        },
        async editItem(idx) {
            try {
                const res = await axios.put(
                    `/api/bucketListItems/${this.selected_id}`,
                    { description: this.editDescription }
                )
                this.items[idx] = res.data
                this.unselect()
            } catch (e) {
                console.log('Edit error!', e)
            }
        },
        isSelected(id) {
            return this.selected_id === id
        },
        select(item, idx) {
            this.editDescription = this.items[idx].description
            this.selected_id = item._id
        },
        unselect() {
            this.selected_id = ''
            this.editDescription = ''
        },
    },
}
</script>

<style>
#app {
    margin: auto;
    max-width: 650px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin-top: 60px;
}
.icon {
    cursor: pointer;
}
</style>
