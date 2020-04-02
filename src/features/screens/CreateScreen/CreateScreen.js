import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { THEME } from 'styles/theme';
import { useDispatch } from 'react-redux';
import { createPost } from 'state/posts';
import { SCREENS } from 'navigation/constants';
import PhotoPicker from 'components/PhotoPicker';

const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imgRef = useRef();

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      title: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(createPost(post));
    navigation.navigate(SCREENS.MAIN)
  };

  const photoPickHandler = uri => {
    imgRef.current = uri
  }
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            Create new post</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Enter text of your post"
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title="Create post"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "OpenSans-Regular",
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 20
  }
});

export default CreateScreen;
