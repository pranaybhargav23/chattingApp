import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from '../services/socket';


const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || {};
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hey! How are you?',
      sent: false,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'I am good! Thanks for asking. How about you?',
      sent: true,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'I am doing great! Want to catch up sometime?',
      sent: false,
      timestamp: new Date(),
    },
  ]);
 
  useEffect(()=>{
    socket.on('receiveMessage', (newMessage) => {
      if(newMessage.senderId === senderId && newMessage.receiverId === receiverId || newMessage.senderId === receiverId && newMessage.receiverId === senderId ){
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };

  },[]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const response = await fetch('http://10.0.2.2:5000/messages/messages/1', options);
      const data = await response.json();
      console.log('Messages fetched:----->', data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to get first letter of username
  const getProfileInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : '?';
  };

  // Function to generate a color based on username
  const getProfileColor = (username) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const charCode = username ? username.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sent: true,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sent ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={[styles.messageText, item.sent ? styles.sentMessageText : styles.receivedMessageText]}>
        {item.text}
      </Text>
      <Text style={[styles.timestamp, item.sent ? styles.sentTimestamp : styles.receivedTimestamp]}>
        {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden/>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={[styles.profilePic, { backgroundColor: getProfileColor(user?.username) }]}>
          <Text style={styles.profileInitial}>{getProfileInitial(user?.username)}</Text>
        </View>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{user?.username || 'Unknown User'}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="videocam" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="call" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="more-vert" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        />
      </View>

      {/* Input Container */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputRow}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
              maxLength={1000}
            />
            <TouchableOpacity style={styles.attachButton}>
              <Icon name="attach-file" size={22} color="#999" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Icon name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e93e3eff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    color: '#B8E6B8',
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 20,
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 12,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentMessageText: {
    color: '#000',
  },
  receivedMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  sentTimestamp: {
    color: '#666',
  },
  receivedTimestamp: {
    color: '#999',
  },
  inputContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    maxHeight: 80,
  },
  attachButton: {
    marginLeft: 8,
    padding: 4,
  },
  sendButton: {
    backgroundColor: '#075E54',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})