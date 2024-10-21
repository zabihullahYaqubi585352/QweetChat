<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-mx-md q-my-sm row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newQweetContent"
            placeholder="What's happening?"
            counter
            maxlength="280"
            autogrow
            class="newQweetInput"
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewQweet"
            :disable="newQweetContent"
            no-caps
            rounded
            color="primary"
            label="Qweet"
            class="q-mb-lg"
          />
        </div>
      </div>
      <q-separator />
      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
            v-for="qweet in Qweets"
            :key="qweet.id"
            class="q-py-md q-px-lg"
          >
            <q-item-section top avatar>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-subtitle1"
                >Zabihullah yaqubi
                <span class="qweet-id-time text-body1"
                  >@Zabihullah<br class="lt-md" /><span class="qweet-dote">
                    · </span
                  >{{ relativeDate(qweet.date) }}</span
                >
              </q-item-label>
              <q-item-label class="qweet-content text-body1">
                {{ qweet.content }}
              </q-item-label>
              <div class="qweet-icons row justify-between q-mt-sm">
                <q-btn
                  flat
                  round
                  size="sm"
                  color="grey"
                  icon="fa-regular fa-comment"
                />
                <q-btn
                  flat
                  round
                  size="sm"
                  color="grey"
                  icon="fas fa-retweet"
                /><q-btn
                  @click="toggleLiked(qweet)"
                  :color="qweet.Liked ? 'pink' : 'grey'"
                  :icon="qweet.Liked ? 'fa-solid fa-heart' : 'far fa-heart'"
                  flat
                  round
                  size="sm"
                />
                <q-btn
                  @click="deleteQweet(qweet)"
                  flat
                  round
                  size="sm"
                  color="grey"
                  icon="fas fa-trash"
                />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
// import LabelBox from "src/components/LabelBox";
import { defineComponent } from "vue";
import { formatDistance } from "date-fns";
import db from "src/boot/firebase";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

export default defineComponent({
  name: "PageHome",
  data() {
    return {
      newQweetContent: "",
      Qweets: [
        // {
        //   id: "ID1",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia ipsa quam adipisci sit quia aperiam nesciunt atque, quas, provident vel doloribus voluptatibus.",
        //   date: 1709636487161,
        //   Liked: true,
        // },
        // {
        //   id: "ID2",
        //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        //   date: 1709636529097,
        //   Liked: false,
        // },
        // {
        //   id: "ID3",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique sunt dicta officia ab. Sint est in officia.",
        //   date: 1709636678964,
        //   Liked: true,
        // },
      ],
    };
  },
  methods: {
    //change date to format date which readable for human
    relativeDate(value) {
      return formatDistance(value, new Date());
    },
    // chage the heart symbol to red and gray
    toggleLiked(qweet) {
      db.collection("qweet")
        .doc(qweet.id)
        .update({
          Liked: !qweet.Liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    // add a qweet to the collection in the database
    addNewQweet() {
      const newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        Liked: false,
      };

      db.collection("qweet")
        .add(newQweet)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });

      this.newQweetContent = "";
    },

    //delete a qweet to the collection in the database
    deleteQweet(qweet) {
      db.collection("qweet")
        .doc(qweet.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  // when the browser loding the function first called and very time when you want to add or remove the qweets this call agian
  mounted() {
    db.collection("qweet")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            this.Qweets.unshift(qweetChange);
          }
          if (change.type === "modified") {
            let index = this.Qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            Object.assign(this.Qweets[index], qweetChange);
          }
          if (change.type === "removed") {
            let index = this.Qweets.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            this.Qweets.splice(index, 1);
          }
        });
      });
  },
});
</script>

<style lang="scss">
.newQweetInput {
  textarea {
    font-size: 20px;
    line-height: 24px !important;
  }
}
.qweet-content {
  white-space: pre-line;
}

.qweet-icons {
  margin-left: -5px;
}

.qweet-id-time {
  color: $grey-7;
  font-weight: 400;
}
.qweet-dote {
  font-weight: 900;
}
.scroll__area {
  width: 100%;
  height: 100%;
}
</style>
